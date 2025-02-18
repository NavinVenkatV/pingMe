import nodemailer from "nodemailer";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma"
import { AxiosError } from 'axios';

const activeJobs = new Map<string, NodeJS.Timeout>();

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

interface WebsiteMonitor {
    url: string;
    email?: string;
    userId: number;
}

function sendMail({ url, email, error = "unknown reason" }: { url: string; email: string; error?: string }) {
    transport.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "PingME Alert: Website Downtime Detected",
        text: `Dear User,

We detected that your monitored website (${url}) is currently experiencing downtime.

Error Details:
${error}

To resolve this:
1. Check your website's infrastructure and connectivity
2. Verify your server status and configurations
3. Contact your hosting provider if needed

To stop receiving these alerts, you can:
- Visit your dashboard at: https://pingmeyourwebsite.vercel.app/dashboard
- Remove this website from your monitoring list

If you need assistance, please don't hesitate to contact our support team.

Best regards,
PingME Monitoring Team`,
    });
}

const checkWebsite = async ({ url, email, userId }: WebsiteMonitor) => {
    console.log(`Checking website ${url} at ${new Date().toISOString()}`);
    try {
        const res = await axios.get(url, {
            timeout: 5000,
            validateStatus: function (status) {
                return status < 400;
            },
        });

        await prisma.website.updateMany({
            where: { url, userId },
            data: { 
                lastStatus: res.status, 
                lastCheckedAt: new Date().toISOString() 
            },
        });

        console.log(`${url} is UP with status ${res.status}`);
    } catch (error) {
        let errorStatus = 500;
        let errorMessage = "Unknown error";

        if (error instanceof AxiosError) {
            if (error.code === 'EAI_AGAIN') {
                errorStatus = 503;
                errorMessage = "DNS lookup failed - domain may be invalid or DNS servers are not responding";
            } else if (error.code === 'ECONNREFUSED') {
                errorStatus = 503;
                errorMessage = "Connection refused by the server";
            } else if (error.response) {
                errorStatus = error.response.status;
                errorMessage = `HTTP error: ${error.response.status}`;
            } else if (error.code === 'ECONNABORTED') {
                errorStatus = 504;
                errorMessage = "Request timed out";
            }
        }

        await prisma.website.updateMany({
            where: { url, userId },
            data: { 
                lastStatus: errorStatus,
                lastCheckedAt: new Date().toISOString() 
            },
        });

        console.log(`${url} is DOWN! Sending alert to ${email}, To stop recieving alerts, please delete the website from your dashboard
            here https://pingmeyourwebsite.vercel.app/. Error: ${errorMessage}`);

        if (email) {
            sendMail({ url, email, error: errorMessage });
        }
    }
};

export async function POST(req: NextRequest) {
    const { url, userId } = await req.json();
    if(!url || !userId){
        return NextResponse.json({msg : "Url or userId missing!"})
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        return NextResponse.json({ msg: "User not exists!" }, { status: 404 });
    }

    if (activeJobs.has(url)) {
        clearInterval(activeJobs.get(url));
        activeJobs.delete(url);
    }

    let website = await prisma.website.findFirst({
        where: { url, userId },
    });

    if (!website) {
        website = await prisma.website.create({
            data: {
                url,
                userId,
                lastStatus: 200,
                lastCheckedAt: new Date().toISOString(),
            },
        });
    }

    await checkWebsite({ url, email: user.email, userId });

    const job = setInterval(
        () => checkWebsite({ url, email: user.email, userId }), 
        5 * 60 * 1000
    );
    activeJobs.set(url, job);

    return NextResponse.json({ 
        msg: `Monitoring started for ${url}`,
        activeMonitoring: Array.from(activeJobs.keys())
    });
}

export async function DELETE(req: NextRequest) {
    const { url, userId } = await req.json();

    try {
        await prisma.website.delete({
            where: {
                url,
                userId
            }
        });
        
        if (activeJobs.has(url)) {
            clearInterval(activeJobs.get(url));
            activeJobs.delete(url);
        }
        
        return NextResponse.json({ 
            msg: "pingMe stopped monitoring your website!",
            activeMonitoring: Array.from(activeJobs.keys())
        });
    } catch(e) {
        console.log(e);
        return NextResponse.json({ msg: "Website is not found in active monitoring!" });
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('paramUrl');
    
    if (!url) {
        return NextResponse.json({ 
            activeMonitoring: Array.from(activeJobs.keys()),
            totalActive: activeJobs.size
        });
    }

    try {
        const status = await prisma.website.findFirst({
            where: { url }
        });
        
        const isActivelyMonitored = activeJobs.has(url);

        if (!status) {
            return NextResponse.json({
                msg: "Website not found!",
                isMonitored: isActivelyMonitored
            });
        }

        return NextResponse.json({
            msg: status.lastStatus < 400 ? "Your Website is working fine!" : "Your Website is down!",
            lastStatus: status.lastStatus,
            lastCheckedAt: status.lastCheckedAt,
            isMonitored: isActivelyMonitored
        });
    } catch (e) {
        console.error("Something went wrong!", e);
        return NextResponse.json({ msg: "Something went wrong!" }, { status: 500 });
    }
}

// Cleanup handlers
process.on('SIGTERM', () => {
    activeJobs.forEach((job) => clearInterval(job));
    activeJobs.clear();
});

process.on('SIGINT', () => {
    activeJobs.forEach((job) => clearInterval(job));
    activeJobs.clear();
});

import nodemailer from "nodemailer";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
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

function sendMail({ url, email }: { url: string; email: string }) {
    transport.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "pingME: Your website is currently down",
        text: `Your website ${url} is currently down due to an unknown reason.`,
    });
}

const checkWebsite = async ({ url, email, userId }: WebsiteMonitor) => {
    try {
        const res = await axios.get(url);

        await prisma.website.updateMany({
            where: { url, userId },
            data: { lastStatus: res.status, lastCheckedAt: new Date().toISOString() },
        });

        console.log(`${url} is UP with status ${res.status}`);
    } catch (e) {
        await prisma.website.updateMany({
            where: { url, userId },
            data: { lastStatus: 500, lastCheckedAt: new Date().toISOString() },
        });

        console.log(`${url} is DOWN! Sending alert to ${email}`);

        if (email) sendMail({ url, email });
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

    if (activeJobs.has(url)) {
        return NextResponse.json({ msg: "Website is already under monitoring!" },{ status : 400 });
    }

    const job = setInterval(() => checkWebsite({ url, email: user.email, userId }), 5 * 60 * 1000);
    activeJobs.set(url, job);

    return NextResponse.json({ msg: `Monitoring started for ${url}` });
}

export async function DELETE(req: NextRequest) {
    const { url, userId } = await req.json();

    if (activeJobs.has(url)) {
        await prisma.website.delete({
            where : {
                url,
                userId
            }
        })
        clearInterval(activeJobs.get(url));
        activeJobs.delete(url);
        return NextResponse.json({ msg: "pingMe stopped monitoring your website!" });
    }

    return NextResponse.json({ msg: "Website is not found in active monitoring!" });
}
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url');
    
    if (!url) {
        return NextResponse.json({ msg: "Url is missing!" }, { status: 400 });
    }

    try {
        const status = await prisma.website.findFirst({
            where: { url }
        });

        if (status?.lastStatus !== 200) {
            return NextResponse.json({ msg: "Your Website is down!" });
        } else {
            return NextResponse.json({ msg: "Your Website is working fine!" });
        }
    } catch (e) {
        return NextResponse.json({ msg: "Something went wrong!" }, { status: 500 });
    }
}

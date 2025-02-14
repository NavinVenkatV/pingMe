import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ msg: "Empty userID!" }, { status: 400 });
        }

        const getUrl = await prisma.user.findUnique({
            where: { id:  Number(userId) },
            include: { websites : true }, 
        });

        if (!getUrl) {
            return NextResponse.json({ msg: "Website not found!" }, { status: 404 });
        }
        const detailedUrls =  getUrl.websites.map(({url, lastStatus}) => ({
            url,
            lastStatus 
        }))

        return NextResponse.json({ urls : detailedUrls });
    } catch (error) {
        console.error("Error fetching user URLs:", error);
        return NextResponse.json({ msg: "Something went wrong!" }, { status: 500 });
    }
}

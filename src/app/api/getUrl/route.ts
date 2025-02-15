import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/app/lib/prisma"


export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ msg: "Empty userID!" }, { status: 400 });
        }

        const getUrl = await prisma.user.findUnique({
            where: { id: Number(userId) },
            include: { websites: true },
        });

        if (!getUrl) {
            return NextResponse.json({ msg: "Website not found!" }, { status: 404 });
        }

        const detailedUrls = getUrl.websites.map((website: { url: string; lastStatus: number }) => ({
            url: website.url,
            lastStatus: website.lastStatus,
        }));

        return NextResponse.json({ urls: detailedUrls });
    } catch (error) {
        console.error("Error fetching user URLs:", error);
        return NextResponse.json({ msg: "Something went wrong!" }, { status: 500 });
    }
}

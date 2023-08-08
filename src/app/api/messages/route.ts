import { NextResponse, type NextRequest } from "next/server"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function POST(req: NextRequest) {
    const { message, userToId, userFromId } = await req.json();
    const newMessage = await prisma.message.create({
        data: {
            message,
            userToId,
            userFromId
        }
    });
    
    return NextResponse.json({ message: "success" })
}
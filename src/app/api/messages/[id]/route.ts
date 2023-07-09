import { NextResponse, type NextRequest } from "next/server"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const data = await prisma.message.findMany({
        where: {
            userToId: params.id
        }
    });

    return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
    const { message, userToId } = await req.json();
    const newMessage = await prisma.message.create({
        data: {
            message,
            userToId,
        }
    });
    
    return NextResponse.json({ message: "success" })
}
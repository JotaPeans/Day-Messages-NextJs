import { NextResponse, type NextRequest } from "next/server"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface getMessageParams {
    params: {
        query: string[]
    }
}

export async function GET(req: NextRequest, { params }: getMessageParams) {
    const data = await prisma.message.findMany({
        skip: params.query[1] ? parseInt(params.query[1]) : undefined,
        take: params.query[2] ? parseInt(params.query[2]) : undefined,
        where: {
            userToId: params.query[0]
        },
        orderBy: [
            {
                createdAt: "desc"
            }
        ]
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
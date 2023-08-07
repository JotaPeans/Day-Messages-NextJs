import { NextResponse, type NextRequest } from "next/server"
import { Message, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Params {
    params: {
        query: string[]
    }
}

export async function GET(req: NextRequest, { params }: Params) {
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

export async function POST(req: NextRequest, { params }: Params) {
    const body: Message = await req.json();
    const messageId = params.query[0];

    await prisma.message.update({
        where: {
            id: messageId
        },
        data: {
            ...body,
            liked: body.liked !== null || body.liked !== false ? true : null,
        }
    })

    return NextResponse.json(body)
}
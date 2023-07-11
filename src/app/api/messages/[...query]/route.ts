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

import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

interface Params {
    params: {
        query: string[]
    }
}

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: Params) {
    const userFromId = params.query[0];

    const message = await prisma.message.findFirst({
        where: {
            userFromId: userFromId
        }
    })

    return NextResponse.json(message)
}
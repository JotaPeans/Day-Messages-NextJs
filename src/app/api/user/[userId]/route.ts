import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

interface Params {
    params: {
        userId: string
    }
}

const prisma = new PrismaClient()

export async function GET(req: NextRequest, { params }: Params) {
    const userId = params.userId;

    const userRes = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    const user = {...userRes}

    const { password, ...rest } = user

    return NextResponse.json(rest)
}
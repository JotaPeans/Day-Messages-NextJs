import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(res: NextResponse) {
    const users = await prisma.user.findMany();
    var newUsers = [];
    for(let user of users) {
        newUsers.push({ 
            id: user.id,
            name: user.name,
            image: user.image
        })
    }

    return NextResponse.json(newUsers)
}
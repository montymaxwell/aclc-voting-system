import prisma from "@/lib/prisma";
import { ServerResponse, UserCreate } from "../../types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
    const users: Array<UserCreate> = await request.json();
    const user_list = users.map(({ USN }) => USN);
    const filtered = users.filter((({ USN }, i) => !user_list.includes(USN, i + 1)));

    try {
       await prisma.users.createMany({ data: filtered });

        return new Response(JSON.stringify({ 
            state: true, 
            message: 'Successfully created new users'

        }), { status: 201 });

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({
            state: false,
            data: error
            
        }), { status: 500 });
    }
}
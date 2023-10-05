import prisma from "@/lib/prisma";
import { ServerResponse, UserCreate } from "../../types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
    const users: Array<UserCreate> = await request.json();
    console.log(users);
    
    try {
        await prisma.users.createMany({ data: users });

        return new Response(JSON.stringify({ 
            state: true, 
            data: 'Successfully created new users'

        }), { status: 201 });

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({
            state: false,
            data: error
            
        }), { status: 500 });
    }
}
import prisma from "@/lib/prisma";
import { ServerResponse, UserCreate } from "../types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
    const user: UserCreate = await request.json();
    
    try {
        await prisma.users.create({ data: user });

        return new Response(JSON.stringify({ 
            state: true, 
            data: 'Successfully created a new user'

        }), { status: 201 });

    } catch (error) {
        return new Response(JSON.stringify({
            state: false,
            data: error
            
        }), { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const USN = request.nextUrl.searchParams.get('target');
    if(USN) {
        try {
            await prisma.users.delete({ where: { USN } });
            return NextResponse.json<ServerResponse>({
                state: true,
                message: 'Successfully removed',
                data: ['USN'],

            }, { status: 200 })

        } catch (error) {
            return NextResponse.json<ServerResponse>({
                state: false,
                message: 'Error: something?'

            }, { status: 500 })
        }
    }

    return NextResponse.json<ServerResponse>({
        state: false,
        message: 'Server required field is missing',
        data: ['USN']

    }, { status: 400 });
}
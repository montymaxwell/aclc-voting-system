import prisma from "@/lib/prisma";
import { ServerResponse, UserCreate } from "../types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
    const user: UserCreate = await request.json();
    
    try {
        const existing_user = await prisma.users.findUnique({ where: { USN: user.USN } });
        if(existing_user) {
            return NextResponse.json<ServerResponse>({
                state: false,
                message: 'User already exists',

            }, { status: 200 })
        }

        const data = await prisma.users.create({ data: user });
        return new Response(JSON.stringify({ 
            state: true, 
            message: 'Successfully created a new user',
            data

        }), { status: 201 });

    } catch (error) {
        return new Response(JSON.stringify({
            state: false,
            message: 'Something went wrong with the request. See the DevTools for more info!',
            data: error
            
        }), { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const USN = request.nextUrl.searchParams.get('target');
    if(USN) {
        try {
            await prisma.users.update({ 
                where: { USN },
                data: { marked: true } 
            });
            return NextResponse.json<ServerResponse>({
                state: true,
                message: 'Successfully removed',

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
        message: 'Server required field(s) is missing',
        data: ['USN']

    }, { status: 400 });
}
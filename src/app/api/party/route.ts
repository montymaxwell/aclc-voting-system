import prisma from "@/lib/prisma";
import { Party } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import { ServerResponse } from "../types";

export async function POST(request: NextRequest) {
    const { name, acronym }: Party = await request.json();

    try {
        const data = await prisma.party.create({ data: { name, acronym }});
        return new Response(JSON.stringify({ 
            state: true, 
            message: 'Successfully created a new party',
            data

        }), { status: 201 });

    } catch (error) {
        return new Response(JSON.stringify({
            state: false,
            data: error

        }), { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const name = request.nextUrl.searchParams.get('target');
    if(name) {
        try {
            await prisma.party.delete({ where: { name } });
            return NextResponse.json<ServerResponse>({
                state: true,
                message: 'Successfully removed'
            })
            
        } catch (error) {
            return NextResponse.json<ServerResponse>({
                state: false,
                message: 'Something went wrong with the request',

            }, { status: 500 })  
        }
    }

    return NextResponse.json<ServerResponse>({
        state: false,
        message: 'Server required field(s) is missing',
        data: ['name'],

    }, { status: 400 })
}
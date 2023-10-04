import prisma from "@/lib/prisma";
import { Candidate } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import { ServerResponse } from "../types";

export async function POST(request: NextRequest) {
    const form: Candidate = await request.json();

    try {
        await prisma.candidates.create({ data: form });

        return new Response(JSON.stringify({
            state: true,
            message: 'Successfully created a new candidate'

        }), { status: 201 });

    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            state: false,
            message: 'Something went wrong with the request'
            
        }), { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
    const id = request.nextUrl.searchParams.get('target');
    if(id) {
        try {
            await prisma.candidates.delete({ where: { id } });
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
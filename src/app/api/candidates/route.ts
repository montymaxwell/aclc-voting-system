import prisma from "@/lib/prisma";
import { Candidate } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import { ServerResponse } from "../types";

export async function POST(request: NextRequest) {
    const form: Candidate = await request.json();

    try { 
        const [candidate, party] = await prisma.$transaction([
            prisma.candidates.create({ data: form }),
            prisma.party.update({
                where: { name: form.party },
                data: { members: { push: form.id } }
            })
        ])

        return new Response(JSON.stringify({
            state: true,
            message: 'Successfully created a new candidate',
            data: candidate

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
            await prisma.candidates.update({ 
                where: { id },
                data: { marked: true } 
            });
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
        message: 'Server required field(s) is missing',
        data: ['USN']

    }, { status: 400 });
}
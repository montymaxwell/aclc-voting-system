import prisma from "@/lib/prisma";
import { Party } from "@/lib/types";
import { NextRequest } from "next/server";

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
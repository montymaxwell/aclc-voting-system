import prisma from "@/lib/prisma";
import { Party } from "@/lib/types";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const { name, acronym }: Party = await request.json();

    try {
        await prisma.party.create({ data: { name, acronym }});
        return new Response(JSON.stringify({ 
            state: true, 
            data: 'Successfully created a new party'

        }), { status: 201 });

    } catch (error) {
        return new Response(JSON.stringify({
            state: false,
            data: error

        }), { status: 500 });
    }
}
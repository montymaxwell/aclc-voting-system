import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(request: Request) {
    try {
        const votes: any[] = await request.json();
        await prisma.votes.createMany({ data: votes });
        await prisma.users.update({
            where: { USN: votes[0].USN },
            data: { voted: true },
        });

        votes.forEach(async v => {
            await prisma.candidates.update({ 
                where: {
                    id: v.candidate
                },
                data: {
                    votes: {
                        increment: 1
                    }
                }
            })
        });

        return new Response(JSON.stringify({
            state: true

        }), { status: 200 });
        
    } catch (error) {
        console.log(error);

        return new Response(JSON.stringify({
            data: false,
            message: 'fuck you buddy'

        }), { status: 500 })   
    }
}

export async function GET(request: NextRequest) {
    const USN = request.nextUrl.searchParams.get('USN');

    if(USN !== null) {
        try {
            const votes = await prisma.votes.findMany({ where: { USN } });
            return new Response(JSON.stringify(votes), { status: 200 });

        } catch (error) {
            return new Response(JSON.stringify({ votes: [] }), { status: 500 });
        }
    }
    else {
        try {
            const votes = await prisma.votes.findMany();
            return new Response(JSON.stringify(votes), { status: 200 });

        } catch (error) {
            console.log(error)
            return new Response(JSON.stringify({ votes: [] }), { status: 500 });
        }
    }
}
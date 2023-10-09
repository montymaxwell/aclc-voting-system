import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ServerResponse } from "../types";

type RequestType = {
    USN: string,
    votes: Array<string>
}

export async function POST(request: NextRequest) {
    const voter: RequestType = await request.json();

    if(voter.USN !== '' && voter.votes.length > 0) {        
        try {
            const user = await prisma.users.findUnique({ where: { USN: voter.USN } });
            if(user && user.voted === true) {
                return NextResponse.json<ServerResponse>({
                    state: false,
                    message: "User has voted and cannot vote again"

                }, { status: 200 });
            }

            await prisma.$transaction([
                prisma.users.update({
                    where: { USN: voter.USN },
                    data: { voted: true }
                }),
                prisma.votes.create({ data: {
                    USN: voter.USN,
                    candidates: voter.votes
                }})
            ]);

            voter.votes.forEach(async vote => {
                await prisma.candidates.update({
                    where: { id: vote },
                    data: {
                        votes: {
                            increment: 1
                        }
                    }
                })
            });

            return NextResponse.json<ServerResponse>({
                state: true,
                message: 'User successfully voted'

            }, { status: 201 });

        } catch (error) {
            console.log(error);

            return NextResponse.json<ServerResponse>({
                state: false,
                message: 'Request failed to be process please try again.'

            }, { status: 500 })
        }
    }

    return NextResponse.json<ServerResponse>({
        state: false,
        message: "User either not voted or has an invalid USN"

    }, { status: 400 });
}

export async function DELETE(request: NextRequest) {
    const id = request.nextUrl.searchParams.get('target');
    if(id) {
        try {
            await prisma.votes.update({
                where: { id: Number(id) },
                data: { marked: true }
            })

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
        data: ['id']

    }, { status: 400 });
}
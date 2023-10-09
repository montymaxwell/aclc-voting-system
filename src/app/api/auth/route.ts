import prisma from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";
import { LoginForm } from "../types";

export async function POST(request: NextRequest) {
    const { USN, password }: LoginForm = await request.json();

    try {
        const user = await prisma.users.findUnique({ where: { USN, password }});
        if(user !== null) {
            const { password, ...data } = user;

            if(data.voted === true) {
                return new Response(JSON.stringify({
                    state: false,
                    message: 'User has already voted',
    
                }), { status: 200 });
            }

            return new Response(JSON.stringify({
                state: true,
                message: 'User Authenticated',
                data

            }), { status: 200 });
        }
        else if(USN === process.env.ADMIN_ACCOUNT && password === process.env.ADMIN_PASSWORD) {
            return NextResponse.json({
                state: true,
                data: {
                    USN: 'ADMIN_ACCOUNT',
                    strand: 'ADMIN',
                    role: 'admin',
                    voted: false,
                    voteList: []
                }

            }, { status: 200 })
        }

        return new Response(JSON.stringify({
            state: false,
            message: 'User does not exists'

        }), { status: 400 });

    } catch (error) {
        return new Response(JSON.stringify({
            state: false,
            message: error

        }), { status: 500 });
    }
}
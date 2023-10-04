import prisma from "@/lib/prisma";

import { NextRequest } from "next/server";
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
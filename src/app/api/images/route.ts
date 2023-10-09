import { ServerResponse } from "@/app/api/types";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

// Done. might need to be further worked on later
export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File
    
        if(file === null) {
            return NextResponse.json<ServerResponse>({
                state: false,
                message: 'file not found',
                data: null
            });
        }
    
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
    
        const path = join(__dirname, '../../../../../public/images', file.name);
        await writeFile(path, buffer);
    
        return NextResponse.json<ServerResponse>({
            state: true,
            message: 'Successfully uploaded the image',
            data: file.name

        }, { status: 201 })

    } catch (error) {
        return NextResponse.json<ServerResponse>({
            state: false,
            message: 'Something went wrong with the request',
            data: error
        })
    }
}
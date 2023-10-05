import { NextRequest, NextResponse } from "next/server";
import { ServerResponse } from "../types";
import { join } from "path";
import { writeFile } from "fs/promises";
import excel from "./excel";

export async function POST(request: NextRequest) {
    console.log('hit')
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
    const path = join(__dirname, '../../../../../public/files', file.name);
    await writeFile(path, buffer);

    const content = excel(join(__dirname, '../../../../../public/files', file.name));

    return NextResponse.json<ServerResponse>({
        state: true,
        message: 'Successfully uploaded the file',
        data: content
    })
}
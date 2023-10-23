import { NextRequest, NextResponse } from "next/server";
import { ServerResponse } from "../types";
import { join } from "path";
import { writeFile } from "fs/promises";
import excel from "./excel";
import { existsSync, mkdirSync } from "fs";

export async function POST(request: NextRequest) {
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

    const dir = join(__dirname, '../../../../../public/files');
    if(!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }

    const path = join(dir, file.name);
    await writeFile(path, buffer);

    const content = excel(join(dir, file.name));

    return NextResponse.json<ServerResponse>({
        state: true,
        message: 'Successfully uploaded the file',
        data: content
    });
}
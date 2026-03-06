import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/lib/admin/file-operations";

export async function POST(request: NextRequest) {
    if (process.env.NODE_ENV !== 'development') {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Default slug if not known (or could pass it in query/body)
        const url = await uploadImage("uploads", file);

        return NextResponse.json({ url });
    } catch (error) {
        console.error("Upload failed:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}

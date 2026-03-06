import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/admin/file-operations";

export async function GET() {
    if (process.env.NODE_ENV !== 'development') {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const posts = await getAllPosts();
    return NextResponse.json(posts);
}

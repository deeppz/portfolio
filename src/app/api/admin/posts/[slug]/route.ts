import { NextRequest, NextResponse } from "next/server";
import { getPost, updatePost, deletePost } from "@/lib/admin/file-operations";

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    if (process.env.NODE_ENV !== 'development') {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    try {
        const post = await getPost(params.slug);

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    if (process.env.NODE_ENV !== 'development') {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    try {
        const body = await request.json();
        const { metadata, content } = body;

        await updatePost(params.slug, metadata, content);

        // Auto-Push to GitHub
        let gitWarning = null;
        try {
            const { syncWithGithub } = await import('@/lib/git');
            const result = await syncWithGithub(`update post ${params.slug}`);
            if (!result.success) {
                gitWarning = result.error;
            }
        } catch (e: any) {
            gitWarning = e.message;
        }

        return NextResponse.json({ success: true, gitWarning });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    if (process.env.NODE_ENV !== 'development') {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    try {
        await deletePost(params.slug);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
    }
}

import { NextRequest, NextResponse } from "next/server";
import { isValidPassword, createSessionToken } from "@/lib/admin/auth";

export async function POST(request: NextRequest) {
    // Only allow in development
    if (process.env.NODE_ENV !== 'development') {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const body = await request.json();
    const { password } = body;

    if (isValidPassword(password)) {
        const token = createSessionToken();
        const response = NextResponse.json({ success: true });

        // Set secure cookie
        response.cookies.set("admin-session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 30, // 30 days
        });

        return response;
    }

    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}

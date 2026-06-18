// apps/web/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
    // Use your API Gateway Auth URL
    const authUrl = process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:8080/api/auth";

    // Ask Better Auth if the current cookie is a valid session
    const response = await fetch(`${authUrl}/get-session`, {
        headers: {
            cookie: request.headers.get("cookie") || "",
        },
    });

    // If the session is dead or missing, bounce them to sign-in
    if (!response.ok) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // Otherwise, let them into the dashboard!
    return NextResponse.next();
}

// Only run this proxy middleware on dashboard routes
export const config = {
    matcher: ["/dashboard/:path*"],
};

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

    try {
        const sessionData = await response.json();
        const user = sessionData?.user;

        // If the user hasn't completed onboarding, redirect them to the onboarding flow
        if (user && !user.onboardingCompleted && !request.nextUrl.pathname.startsWith("/onboarding")) {
            return NextResponse.redirect(new URL("/onboarding", request.url));
        }

        // If the user HAS completed onboarding and tries to visit /onboarding, send to dashboard
        if (user && user.onboardingCompleted && request.nextUrl.pathname.startsWith("/onboarding")) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    } catch (e) {
        // Ignore json parse error, just proceed or redirect to sign-in
    }

    // Otherwise, let them into the page
    return NextResponse.next();
}

// Protect both dashboard and onboarding routes
export const config = {
    matcher: ["/dashboard/:path*", "/onboarding"],
};

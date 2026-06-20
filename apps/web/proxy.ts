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

    const isAuthRoute = ["/sign-in", "/sign-up", "/forgot-password", "/reset-password"].some(route => 
        request.nextUrl.pathname.startsWith(route)
    );
    const isProtectedRoute = request.nextUrl.pathname.startsWith("/dashboard") || request.nextUrl.pathname.startsWith("/onboarding");

    // If the session is dead or missing, and trying to access a protected route, bounce them to sign-in
    if (!response.ok) {
        if (isProtectedRoute) {
            return NextResponse.redirect(new URL("/sign-in", request.url));
        }
        return NextResponse.next();
    }

    try {
        const sessionData = await response.json();
        const user = sessionData?.user;

        if (user) {
            // If the user is authenticated and tries to visit auth routes, send to dashboard
            if (isAuthRoute) {
                return NextResponse.redirect(new URL("/dashboard", request.url));
            }

            // If the user hasn't completed onboarding, redirect them to the onboarding flow
            if (!user.onboardingCompleted && !request.nextUrl.pathname.startsWith("/onboarding")) {
                return NextResponse.redirect(new URL("/onboarding", request.url));
            }

            // If the user HAS completed onboarding and tries to visit /onboarding, send to dashboard
            if (user.onboardingCompleted && request.nextUrl.pathname.startsWith("/onboarding")) {
                return NextResponse.redirect(new URL("/dashboard", request.url));
            }
        }
    } catch (e) {
        // Ignore json parse error, just proceed or redirect to sign-in
        if (isProtectedRoute) {
            return NextResponse.redirect(new URL("/sign-in", request.url));
        }
    }

    // Otherwise, let them into the page
    return NextResponse.next();
}

// Protect both dashboard/onboarding and handle auth route redirects
export const config = {
    matcher: ["/dashboard/:path*", "/onboarding", "/sign-in", "/sign-up", "/forgot-password", "/reset-password"],
};

import { NextResponse } from "next/server";

export function middleware(req) {
    const authCookie = req.cookies.get("auth");

    if (!authCookie && (req.nextUrl.pathname === "/edit" || req.nextUrl.pathname === "/portfolio/edit")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/edit", "/portfolio/edit"],
};
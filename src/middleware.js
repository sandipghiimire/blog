import { NextResponse } from "next/server";
import { jwtVerify } from 'jose';

const TOKEN_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

async function verifyToken(token) {
    try {
        const { payload } = await jwtVerify(token, TOKEN_SECRET);
        return payload;
    } catch (error) {
        return null;
    }
}

export async function middleware(req) {
    const path = req.nextUrl.pathname;
    const token = req.cookies.get("token")?.value || "";

    const publicPaths = ['/', '/login', '/blogsinup'];
    const isPublicPath = publicPaths.includes(path);

    // ✅ if user is logged in and trying to access login or register, redirect to home
    if (token && (path === '/login' || path === '/blogsinup')) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    // 🔒 if user is NOT logged in and path is NOT public, redirect to login
    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // ✅ if token exists, verify it
    if (token) {
        const payload = await verifyToken(token);

        if (!payload) {
            return NextResponse.redirect(new URL('/login', req.url));
        }

        // 🛡️ restrict admin routes to only isAdmin
        if (path.startsWith('/blogform')) {
            if (!payload.isAdmin) {
                return NextResponse.redirect(new URL('/', req.url));
            }
        }

        // Set isAdmin header (optional use in client/server)
        const requestHeaders = new Headers(req.headers);
        requestHeaders.set("isAdmin", payload.isAdmin.toString());
        return NextResponse.next({ request: { headers: requestHeaders } });
    }

    // ✅ Allow access to public pages for all
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/blogform/:path*',
        '/login',
        '/blogsinup',
    ],
};

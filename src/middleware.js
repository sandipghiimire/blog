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

    if (token && (path === '/login' || path === '/blogsinup')) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (token) {
        const payload = await verifyToken(token);

        if (!payload) {
            return NextResponse.redirect(new URL('/login', req.url));
        }

        if (path.startsWith('/blogform')) {
            if (!payload.isAdmin) {
                return NextResponse.redirect(new URL('/', req.url));
            }
        }

        const requestHeaders = new Headers(req.headers);
        requestHeaders.set("isAdmin", payload.isAdmin.toString());
        return NextResponse.next({ request: { headers: requestHeaders } });
    }

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

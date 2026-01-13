import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedPaths = ['/home', '/italian-jokes', '/harry-potter', '/employees']

export function middleware(req: NextRequest) {
    const isProtected = protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))
    if (!isProtected) {
        return NextResponse.next()
    }
    const accessToken = req.cookies.get('access_token')?.value
    if (!accessToken) {
        const loginUrl = new URL('/login', req.url)
        return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
}

export const config = {
  matcher: ['/home/:path*', '/employees/:path*', '/italian-jokes/:path*', '/harry-potter/:path*'],
}

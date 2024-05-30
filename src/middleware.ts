import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { TJWTPayload, TUserRole } from "@/types";
import { refreshTokenKey } from "@/constant/refreshTokenKey";

const authRoutes = [
  "/login",
  "/registration",
];

const roleBasedPrivateRoutes = {
  USER: [
    /^\/dashboard\/user/,
    /^\/donor-details\/[^\/]+\/donation-request$/,
  ],
  ADMIN: [
    /^\/dashboard\/admin/,
  ],
  SUPER_ADMIN: [
    /^\/dashboard\/super_admin/,
  ],
}

export function middleware(request: NextRequest) {
  const {pathname } = request.nextUrl;
  const accessToken = cookies().get(refreshTokenKey)?.value;

  if (!accessToken) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  try {
    const decode: TJWTPayload = jwtDecode(accessToken as string);
    const role = (decode?.role as string);

    const isValidToken = decode.exp && Date.now() <= decode.exp * 1000;

    if (!role) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (!isValidToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (pathname === "/dashboard/change-password") {
      return NextResponse.next();
    }

    const allowedPrivateRoutes = roleBasedPrivateRoutes[role as TUserRole];
    if (!allowedPrivateRoutes?.some((regx) => regx.test(pathname))) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  catch (error: any) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/registration",
    "/login",
    "/dashboard/:path*",
    "/donor-details/:donorId/donation-request/:path?",
  ],
}
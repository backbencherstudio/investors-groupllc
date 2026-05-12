import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


const PUBLIC_PREFIXES = [
  "/login",
  "/forgot-password",
  "/enter-otp",
  "/reset-your-password",
  "/reset-successful",
];

function isPublicPath(pathname: string) {
  if (pathname === "/") return true;
  return PUBLIC_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("access-token")?.value;
  const publicRoute = isPublicPath(pathname);

  if (!token && !publicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && publicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {

    const callbackUrl =
      request.nextUrl.pathname + request.nextUrl.search;


      
    const loginUrl = new URL("/login", request.url);

  
    loginUrl.searchParams.set("callbackUrl", callbackUrl);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/all-books/:path",
    "/add-book/:path*",
    "/my-books/:path*",
    "/my-borrows/:path*",
    "/profile/:path*",
  ],
};

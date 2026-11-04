
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    // CHANGED 1:
    // যে page-এ যেতে চেয়েছিল তার pathname + query সংরক্ষণ।
    const callbackUrl =
      request.nextUrl.pathname + request.nextUrl.search;

    // CHANGED 2:
    // Login URL তৈরি।
    const loginUrl = new URL("/login", request.url);

    // CHANGED 3:
    // Login URL-এর সাথে callbackUrl পাঠানো।
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

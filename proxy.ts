// proxy.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parseSetCookie } from "cookie";
import { checkServerSession } from "./lib/api/serverApi";

// маршрути
const publicRoutes = ["/sign-in", "/sign-up"];
const privateRoutes = ["/profile", "/profile/edit", "/notes", "/notes/filter"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!accessToken) {
    if (refreshToken) {
      // перевіряємо сесію навіть для публічного маршруту
      const data = await checkServerSession();
      const setCookie = data.headers["set-cookie"];

      if (setCookie) {
        // розбираємо всі куки
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        for (const cookieStr of cookieArray) {
          const parsed = parseSetCookie(cookieStr);
          if (parsed.value) {
            cookieStore.set(parsed.name, parsed.value, parsed);
          }
        }

        // якщо сесія активна
        if (isPublicRoute) {
          return NextResponse.redirect(new URL("/", request.url), {
            headers: { Cookie: cookieStore.toString() },
          });
        }
        if (isPrivateRoute) {
          return NextResponse.next({
            headers: { Cookie: cookieStore.toString() },
          });
        }
      } else {
        // немає нових токенів
        if (isPrivateRoute) {
          return NextResponse.redirect(new URL("/sign-in", request.url));
        }
      }
    }

    // якщо немає refreshToken або сесії
    if (isPublicRoute) {
      return NextResponse.next();
    }
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  // якщо accessToken існує
  if (isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (isPrivateRoute) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/profile/:path*", "/notes/:path*"],
};

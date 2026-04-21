import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { env } from "@/lib/config/env";

const LOCALES = ["en", "es"] as const;
type Locale = (typeof LOCALES)[number];
const DEFAULT_LOCALE: Locale = "en";

function detectLocale(request: NextRequest): Locale {
  // 1. Cookie takes priority (set by LanguageToggle)
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && LOCALES.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }
  // 2. Accept-Language header fallback
  const acceptLang = request.headers.get("Accept-Language");
  if (acceptLang) {
    const preferred = acceptLang.split(",")[0].split("-")[0].toLowerCase();
    if (LOCALES.includes(preferred as Locale)) return preferred as Locale;
  }
  return DEFAULT_LOCALE;
}

const isProtectedRoute = (pathname: string) =>
  pathname === "/dashboard" ||
  pathname.startsWith("/dashboard/") ||
  pathname === "/estimate" ||
  pathname.startsWith("/estimate/") ||
  pathname === "/estimations" ||
  pathname.startsWith("/estimations/") ||
  pathname === "/onboarding" ||
  pathname === "/insights" ||
  pathname.startsWith("/insights/") ||
  pathname === "/settings" ||
  pathname.startsWith("/settings/");

export async function proxy(request: NextRequest) {
  const locale = detectLocale(request);

  // Forward locale and pathname to server components via request headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("X-NEXT-INTL-LOCALE", locale);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  if (!isProtectedRoute(request.nextUrl.pathname)) {
    return response;
  }

  // Verify Supabase session for protected routes
  const supabase = createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return response;
  }

  const url = request.nextUrl.clone();
  url.pathname = "/login";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

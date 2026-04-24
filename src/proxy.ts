import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { env } from "@/lib/config/env";

const LOCALES = ["en", "es"] as const;
type Locale = (typeof LOCALES)[number];
const DEFAULT_LOCALE: Locale = "en";

function detectLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && LOCALES.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }
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

// Only gate the estimate creation page — everything else (estimations list,
// insights, settings, referrals, plan) should be accessible at any time.
const isOnboardingGated = (pathname: string) =>
  pathname === "/estimate" || pathname.startsWith("/estimate/");

export async function proxy(request: NextRequest) {
  const locale = detectLocale(request);
  const pathname = request.nextUrl.pathname;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("X-NEXT-INTL-LOCALE", locale);
  requestHeaders.set("x-pathname", pathname);

  let response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  const supabase = createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({
          request: { headers: requestHeaders },
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isProtectedRoute(pathname) && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Onboarding gate: redirect new users before they reach any app route.
  // Runs only for routes where onboarding is required (not /onboarding itself).
  // The proxy is the right place for this check because it has reliable access
  // to the exact pathname — layouts cannot safely detect their own route via
  // forwarded headers in Next.js 16 proxy files.
  if (user && isOnboardingGated(pathname)) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("onboarding_completed")
      .eq("id", user.id)
      .single();

    if (!profile?.onboarding_completed) {
      const { count } = await supabase
        .from("estimations")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id);

      if ((count ?? 0) === 0) {
        const url = request.nextUrl.clone();
        url.pathname = "/onboarding";
        return NextResponse.redirect(url);
      }
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

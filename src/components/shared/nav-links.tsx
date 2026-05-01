"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LogoutButton } from "@/components/shared/logout-button";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", exact: true },
  { href: "/estimate", label: "New Estimate", exact: false },
  { href: "/estimations", label: "Estimations", exact: false },
  { href: "/settings/referrals", label: "Referrals", exact: false },
  { href: "/settings", label: "Plan", exact: true },
];

function isActive(pathname: string, href: string, exact: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(href + "/");
}

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
      {NAV_ITEMS.map((item) => {
        const active = isActive(pathname, item.href, item.exact);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-md px-3 py-2 transition-colors ${
              active
                ? "bg-foreground/10 text-foreground"
                : "hover:bg-foreground/5 hover:text-foreground"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
      <span className="mx-1 h-4 w-px bg-white/10" />
      <LogoutButton />
    </nav>
  );
}

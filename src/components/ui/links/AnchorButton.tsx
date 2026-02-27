'use client'
import Link from "next/link";
import { GithubIcon } from "@/components/icons/GithubIcon";

interface Props {
  text?: string;
  icon?: boolean;
  href: string;
  alt?: string;
  variant?: "primary" | "secondary";
}

export const AnchorButton = ({ text, href, alt, icon, variant = "primary" }: Props) => {
  const label = alt ?? text ?? "Link";
  const baseClasses =
    "group inline-flex h-10 items-center justify-center gap-2 rounded-full border text-sm font-medium backdrop-blur transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jitcyan/70 focus-visible:ring-offset-2 focus-visible:ring-offset-jitblue text-nowrap";
  const sizeClasses = icon ? "w-10 px-0" : "px-4";
  const variantClasses =
    variant === "secondary"
      ? "border-jityellow/35 bg-jityellow text-jitblue hover:border-jityellow/90 hover:bg-jityellow/80 active:shadow-[0_0_12px_rgba(0,172,255,0.18)]"
      : "border-jitcyan/50 bg-jitblue/70 text-white/95 hover:border-jitcyan hover:bg-jitblue/90 hover:shadow-[0_0_20px_rgba(0,172,255,0.35)] active:shadow-[0_0_12px_rgba(0,172,255,0.25)]";

  return (
    <Link className={`${baseClasses} ${variantClasses} ${sizeClasses}`} href={href} aria-label={label}>
      {icon && <GithubIcon className="h-5 w-5 block " />}
      {!icon && text}
    </Link>
  );
};

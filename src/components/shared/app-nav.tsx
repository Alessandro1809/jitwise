import { NavLinks } from "@/components/shared/nav-links";

export function AppNav() {
  return (
    <header className="border-b border-white/10 bg-white/5 backdrop-blur supports-backdrop-filter:bg-white/10">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Jitwise
          </span>
          <span className="text-sm font-semibold text-foreground">
            Estimation Workspace
            <span className="ml-2 inline-flex h-1.5 w-6 rounded-full bg-jityellow" />
          </span>
        </div>
        <NavLinks />
      </div>
    </header>
  );
}

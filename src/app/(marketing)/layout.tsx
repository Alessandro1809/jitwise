import type { Metadata } from "next";
import { NavBar } from "./_components/navbar/NavBar";
export const metadata: Metadata = {
  title: "Jitwise - Scope-first estimation for software projects",
  description:
    "Jitwise is a tool that helps software teams estimate their projects by focusing on the scope of work. It provides a simple and intuitive interface for creating and managing project scopes, allowing teams to make informed decisions about their projects and deliver high-quality software on time.",
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
 
 
  <div className="min-h-screen w-full bg-black relative text-white overflow-hidden dark">
    {/* Prismatic Aurora Burst - Multi-layered Gradient */}
    <div
      className="absolute inset-0 z-0"
      style={{
        background: `
          radial-gradient(ellipse 120% 80% at 70% 20%, rgba(255, 20, 147, 0.15), transparent 50%),
          radial-gradient(ellipse 100% 60% at 30% 10%, rgba(0, 255, 255, 0.12), transparent 60%),
          radial-gradient(ellipse 90% 70% at 50% 0%, rgba(138, 43, 226, 0.18), transparent 65%),
          radial-gradient(ellipse 110% 50% at 80% 30%, rgba(255, 215, 0, 0.08), transparent 40%),
          #000000
        `,
      }}
    />
    <NavBar />
    {children}
  </div>
  
  </>;

}

"use client";

import { usePathname } from "next/navigation";

import { useMediaQuery } from "@/app/hooks/use-media-query";
import Link from "next/link";

export default function Header() {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isHome = usePathname() === "/";

    return (
        <header className="sticky top-0 z-10 border-b border-black bg-[#F7F6F2]">
        <div className="border-l border-r border-black px-6 w-screen">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div>
              <Link href="/" className="hover:underline"><h1 className="text-2xl font-semibold tracking-tight font-space-mono">Data Driven Outcomes</h1></Link>
              <p className="text-sm text-gray-700 font-space-mono">BIG Data for small businesses</p>
            </div>
            <nav className="grid grid-cols-3 text-sm sm:justify-self-end font-space-mono">
              <Link href={isHome ? "#contact" : "/#contact"} className="bg-linear-to-br from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-white hover:text-black duration-200 ease-in-out text-center text-white px-2">{isMobile ? "Contact" : "Get in Touch"}</Link>
              <Link href="/blog" className="hover:bg-green-500 duration-200 ease-in-out text-center px-2">Blog</Link>
              <Link href={isHome ? "#strategy" : "/#strategy"} className="hover:bg-blue-500 duration-200 ease-in-out text-center px-2">Strategy</Link>
            </nav>
          </div>
        </div>
      </header>
    );
}
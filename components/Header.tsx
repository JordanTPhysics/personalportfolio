"use client";



import { useMediaQuery } from "@/app/hooks/use-media-query";
import Link from "next/link";

export default function Header() {
    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <header className="sticky top-0 z-10 border-b border-black bg-[#F7F6F2]">
        <div className="border-l border-r border-black px-6 w-screen">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Data Driven Outcomes</h1>
              <p className="text-sm text-gray-700">BIG Data for small businesses</p>
            </div>
            <nav className="grid grid-cols-4 text-sm sm:justify-self-end font-kode-mono">
              <Link href="#contact" className="hover:bg-indigo-500 duration-200 ease-in-out text-center px-2">{isMobile ? "Contact" : "Get in Touch"}</Link>
              <Link href="#about" className="hover:bg-green-500 duration-200 ease-in-out text-center px-2">About</Link>
              <Link href="#mission" className="hover:bg-orange-500 duration-200 ease-in-out text-center px-2">Mission</Link>
              <Link href="#strategy" className="hover:bg-blue-500 duration-200 ease-in-out text-center px-2">Strategy</Link>
            </nav>
          </div>
        </div>
      </header>
    );
}
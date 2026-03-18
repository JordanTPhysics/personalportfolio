"use client";

import { usePathname } from "next/navigation";

import { useMediaQuery } from "@/app/hooks/use-media-query";
import Link from "next/link";
import { faro } from "@grafana/faro-web-sdk";

export default function Header() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const p = usePathname();


  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    faro.api.startUserAction(e.currentTarget.dataset.trackerId!,
      {
        actionName: e.currentTarget.dataset.trackerId!,
        actionType: e.currentTarget.dataset.trackerId!.includes("contact-link") ? "cta-click" : "link-click",
      }
    );
  };
  return (
    <header className="sticky top-0 z-10 border-b border-black bg-[#F7F6F2]">
      <div className="border-l border-r border-black w-screen">
        <div className={`flex ${isMobile ? "flex-col" : "flex-row"} justify-between`}>
          <div className="px-2">
            <Link href="/" onClick={handleLinkClick} data-tracker-id="title-link" className="hover:underline"><h1 className="text-h3 font-semibold tracking-tight font-space-mono">Data Driven Outcomes</h1></Link>
            <p className="text-sm text-gray-700 font-space-mono">BIG Data for small businesses</p>
          </div>
          <Link href={p === "/" ? "#contact" : "/#contact"} data-tracker-id="contact-link" className="text-h3 text-center px-6 py-2 m-2 mx-auto bg-linear-to-br from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-white hover:text-black hover:scale-105 duration-200 ease-in-out text-white rounded-md">Get in Touch</Link>

          <nav className="grid grid-cols-3 text-h4 sm:justify-self-end font-space-mono lg:mx-2">
            <Link href={p === "/" ? "#strategy" : "/"} className={`${p === "/" ? "bg-blue-500 text-white" : ""} data-tracker-id="info-link" hover:bg-blue-500 duration-200 ease-in-out text-center px-2 `}>Info</Link>
            <Link href="/blog" className={`hover:bg-green-500 ${p.includes("blog") ? "bg-green-500 text-white" : ""} data-tracker-id="blog-link" duration-200 ease-in-out text-center px-2`}>Blog</Link>
            <Link href="/survey" className={`hover:bg-orange-500 ${p.includes("survey") ? "bg-orange-500 text-white" : ""} data-tracker-id="survey-link" duration-200 ease-in-out text-center px-2`}>{isMobile ? "Survey" : "SMED Survey"}</Link>
          </nav>

        </div>

      </div>
    </header>
  );
}
"use client";

import { useMediaQuery } from "@/app/hooks/use-media-query";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    const githubUrl = "https://github.com/JordanTPhysics";
    const linkedinUrl = "https://www.linkedin.com/in/jordan-thijssen-373a431a5/";

    const iconSize = useMediaQuery("(max-width: 768px)") ? 24 : 36;
    return (
        <footer className="border-t border-black bg-[#F7F6F2]">
          <div className="border-l border-r border-black py-12 px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Data Driven Business Management</p>
                <p className="text-sm text-gray-700">
                  Independent data analytics partner for small businesses
                </p>
              </div>
              <div className="text-sm text-gray-600 sm:justify-self-end">
                <Link href={githubUrl}><FaGithub size={iconSize} color="black" /></Link>
                <Link href={linkedinUrl}><FaLinkedin size={iconSize} color="teal" /></Link>
              </div>
            </div>
          </div>
        </footer>
    );
}
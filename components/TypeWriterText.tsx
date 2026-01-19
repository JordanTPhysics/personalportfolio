'use client';

import { useEffect, useState } from "react";

type TypeWriterTextProps = {
  texts: string[];
  typingSpeed?: number;   // ms per character
  deletingSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
};

export default function TypeWriterText({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 3000,
  loop = true,
}: TypeWriterTextProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [textColor, setTextColor] = useState("text-black");

  useEffect(() => {
    const current = texts[textIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      // typing
      if (displayed.length < current.length) {
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
          setTextColor("text-blue-500");
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
          setTextColor("text-black");
        }, pauseDuration);
      }
    } else {
      // deleting
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length - 1));
          setTextColor("text-orange-500");
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setTextIndex((prev) =>
          loop ? (prev + 1) % texts.length : prev
        );
      }
    }

    return () => clearTimeout(timeout);
  }, [
    displayed,
    isDeleting,
    textIndex,
    texts,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    loop,
  ]);


  return (
    <span className={`${textColor} font-space-mono transition-colors duration-300`}>
      {displayed}
      <span className="cursor text-black">|</span>
    </span>
  );
}

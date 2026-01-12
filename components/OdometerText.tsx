import { useEffect, useRef, useState } from "react";

const chars = ["A", "B", "C", "D", "E", "F"];

export default function FlipChar({
  interval = 1500,
  duration = 400,
}: {
  interval?: number;
  duration?: number;
}) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setFlipped(true);
    }, interval);

    return () => clearInterval(id);
  }, [interval]);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const onTransitionEnd = () => {
      if (!flipped) return;

      // Commit new character
      setIndex((i) => (i + 1) % chars.length);

      // Reset flip instantly
      el.style.transition = "none";
      setFlipped(false);

      requestAnimationFrame(() => {
        el.style.transition = `transform ${duration}ms ease-in-out`;
      });
    };

    el.addEventListener("transitionend", onTransitionEnd);
    return () => el.removeEventListener("transitionend", onTransitionEnd);
  }, [flipped, duration]);

  const current = chars[index];
  const next = chars[(index + 1) % chars.length];

  return (
    <div className="perspective-1000 w-10 h-12">
      <div
        ref={cardRef}
        className="relative w-full h-full transform-style-preserve-3d"
        style={{
          transform: flipped ? "rotateX(180deg)" : "rotateX(0deg)",
          transition: `transform ${duration}ms ease-in-out`,
        }}
      >
        {/* Front */}
        <div className="absolute inset-0 flex items-center justify-center bg-white font-mono text-xl rounded shadow backface-hidden">
          {current}
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-white font-mono text-xl rounded shadow backface-hidden"
          style={{ transform: "rotateX(180deg)" }}
        >
          {next}
        </div>
      </div>
    </div>
  );
}

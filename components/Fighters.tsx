"use client";
import { useEffect, useRef } from "react";

export default function Fighters() {
  const containerRef = useRef<HTMLDivElement>(null);
  const planeRefs = useRef<HTMLImageElement[]>([]);

  // use a proper transparent PNG
  const planeSrcs = [
    "/images/plane.png",
    "/images/plane.png",
    "/images/plane.png",
    "/images/plane.png",
  ];

  const speeds = [0.5, 0.8, 1.2, 1.0];

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewHeight = window.innerHeight;

      if (rect.top < viewHeight && rect.bottom > 0) {
        const scrollY = window.scrollY;
        planeRefs.current.forEach((img, idx) => {
          if (img) {
            // move right → left
            img.style.transform = `translateX(${-scrollY * speeds[idx]}px)`;
          }
        });
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[200px] -mt-56 overflow-hidden"
    >
      {planeSrcs.map((src, idx) => (
        <img
          key={idx}
          ref={(el) => {
            if (el) planeRefs.current[idx] = el;
          }}
          src={src}
          alt="plane"
          className={`absolute w-16`}
          style={{
            top: `${20 + idx * 15}%`,
            right: "-100px", // start offscreen right
            transform: "translateX(0px)",
          }}
        />
      ))}
    </div>
  );
}

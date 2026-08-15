// components/Marquee.tsx
"use client";

import { techStack } from "@/lib/constants";

const tickerItems = [...techStack, ...techStack];

export default function Marquee() {
  return (
    <div className="border-y border-white/10 bg-[#0c0c10] py-4 overflow-hidden select-none">
      <div className="marquee-track flex items-center">
        {tickerItems.map((tech, index) => (
          <span
            key={`${tech.name}-${index}`}
            className="flex items-center text-lg font-semibold uppercase tracking-wider whitespace-nowrap text-zinc-500"
          >
            <span>{tech.name}</span>
            <span className="mx-5 text-indigo-500">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
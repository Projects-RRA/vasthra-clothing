"use client";
import React, { useState } from "react";
import { cn } from "@/app/utils/cssMerge";

export const Card = React.memo(({ card, index, hovered, setHovered }) => (
  <a href={card.link}>
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out mt-10 cursor-pointer",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      <img
        src={card.src}
        alt={card.title}
        className="object-cover absolute inset-0"
      />
      <div
        className={cn(
          "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
          "md:opacity-0 md:hover:opacity-100 opacity-100"
        )}
      >
        <div className="text-white">
          <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
            {card.title}
          </div>
          <div className="text-sm text-neutral-200 mt-1">{card.desc}</div>
        </div>
      </div>
    </div>
  </a>
));

Card.displayName = "Card";

export function FocusCards({ cards }) {
  const [hovered, setHovered] = useState(null);

  return (
    <>
      {/* Heading Section */}
      <div className="text-center mt-16 mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Shop by Category</h2>
        <p className="mt-2 text-gray-600 text-sm md:text-base">
          Explore our curated categories for Men, Women, and Kids. Find the
          perfect fit for every style.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto px-8 mt-8 pb-10 w-full">
        {cards.map((card, index) => (
          <Card
            key={card.title}
            card={card}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
          />
        ))}
      </div>
    </>
  );
}

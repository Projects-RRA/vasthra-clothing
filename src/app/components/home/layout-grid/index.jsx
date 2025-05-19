"use client";
import React from "react";
import { LayoutGrid } from "@/app/components/core/layout-grid";

export function LayoutGridDemo() {
  return (
    <div className="h-screen py-20 w-full">
      <h2 className="max-w-7xl pl-10 mx-auto text-xl md:text-5xl font-bold text-neutral-800">
        The Vasthra Experience
      </h2>
      <LayoutGrid cards={cards} />
    </div>
  );
}

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Our Story: Woven with Purpose. Stitched with Passion
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Vasthra was born from a love of fabric and culture — an effort to revive
        the grace of Indian textiles with a modern twist. What started as a
        home-grown label has now dressed thousands. Each piece carries a part of
        our journey — humble, bold, and rooted.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Behind the Fabric: "More Than Just Fabric"
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Our cotton is sourced from the looms of Gujarat, our prints are
        hand-blocked by skilled artisans, and our dyes are made from nature —
        turmeric, indigo, madder. We don’t just create clothes. We preserve
        stories, skills, and sustainability.
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Real People, Real Stories: "You Wear It Best"
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        From weddings to weekend brunches, Vasthra has been part of your
        everyday moments and life milestones. We celebrate you — the real faces
        behind our brand.
      </p>
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Our Values: "Ethics First. Always."
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        At Vasthra, we believe slow fashion is the future. Every piece is made
        in small batches, ensuring zero waste and fair wages. We don’t chase
        trends — we craft timeless pieces for every body.
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2 cursor-pointer",
    thumbnail: "https://i.postimg.cc/TwskPdd5/our-story-image-1-low.jpg",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1 cursor-pointer",
    thumbnail: "https://i.postimg.cc/kGMH218L/our-story-image-2.jpg",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1 cursor-pointer",
    thumbnail: "https://i.postimg.cc/ThMWkS94/our-story-image-3.jpg",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2 cursor-pointer",
    thumbnail:
      "https://i.postimg.cc/G37RkG2v/our-story-image-4.jpg",
  },
];

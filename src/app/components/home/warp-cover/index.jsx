import React from "react";
import { Cover } from "@/app/components/core/warp-cover";

export function CoverDemo() {
  return (
    (<div className="mx-auto">
      <h1
        className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700">
        Get Your items delivered <br /> at <Cover>warp speed</Cover>
      </h1>
    </div>)
  );
}

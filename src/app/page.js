"use client";
import { useState, useEffect } from "react";
import { AppleCardsCarouselDemo } from "@/app/components/home/home-carousel";
import { LayoutGridDemo } from "@/app/components/home/layout-grid";
import { CoverDemo } from "@/app/components/home/warp-cover";
import PrivateRoute from "./components/core/private-route";
import Loader from "@/app/components/core/loader";

export default function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000); // Simulate a 3-sec load
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" min-h-screen p-8 pb-20 gap-16 sm:p-20">
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <PrivateRoute>
              <AppleCardsCarouselDemo />
              <LayoutGridDemo />
              <CoverDemo />
            </PrivateRoute>
          </main>
        </div>
      )}
    </>
  );
}

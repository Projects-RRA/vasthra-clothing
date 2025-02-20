import { AppleCardsCarouselDemo } from "@/app/components/home/home-carousel";
import { LayoutGridDemo } from "@/app/components/home/layout-grid";
import { CoverDemo } from "@/app/components/home/warp-cover";

export default function Home() {
  return (
    <div className=" min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <AppleCardsCarouselDemo />
        <LayoutGridDemo />
        <CoverDemo />
      </main>
    </div>
  );
}

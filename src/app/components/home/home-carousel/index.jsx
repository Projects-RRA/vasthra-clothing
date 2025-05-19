"use client";
import React from "react";
import { Carousel, Card } from "@/app/components/core/apple-cards-carousel";

export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ));

  return (
    (<div className="w-full h-full">
      <h2
        className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800">
        Tradition. Trend. Vasthra.
      </h2>
      <Carousel items={cards} />
    </div>)
  );
}

// const DummyContent = () => {
//   return (<>
//     {[...new Array(3).fill(1)].map((_, index) => {
//       return (
//         (<div
//           key={"dummy-content" + index}
//           className="bg-[#F5F5F7] p-8 md:p-14 rounded-3xl mb-4">
//           <p
//             className="text-neutral-600 text-base md:text-2xl font-sans max-w-3xl mx-auto">
//             <span className="font-bold text-neutral-700">
//               The first rule of Apple club is that you boast about Apple club.
//             </span>{" "}
//             Keep a journal, quickly jot down a grocery list, and take amazing
//             class notes. Want to convert those notes to text? No problem.
//             Langotiya jeetu ka mara hua yaar is ready to capture every
//             thought.
//           </p>
//           <Image
//             src="https://assets.aceternity.com/macbook.png"
//             alt="Macbook mockup from Aceternity UI"
//             height="500"
//             width="500"
//             className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain" />
//         </div>)
//       );
//     })}
//   </>);
// };

const data = [
  {
    category: "Spring '25 Collection",
    title: "Fresh styles in floral, pastel, and bold prints.",
    src: "https://i.postimg.cc/8cBtmhdM/carouse-carousel-image-5-low.jpg",
    // content: <DummyContent />,
  },
  {
    category: "Flat 40% Off on Ethnic Wear",
    title: "Limited-time offer. Shop before it ends!",
    src: "https://i.postimg.cc/hjVrK956/carouse-carousel-image-1-low.jpg",
    // content: <DummyContent />,
  },
  {
    category: "New Arrivals in Western Wear",
    title: "Trendy fits you’ll love.",
    src: "https://i.postimg.cc/HxTJ7XLf/carouse-carousel-image-4-low.jpg",
    // content: <DummyContent />,
  },

  {
    category: "Celebrate Diwali in Style",
    title: "Handpicked traditional wear for the season.",
    src: "https://i.postimg.cc/9MShjHsJ/carouse-carousel-image-6-low.jpg",
    // content: <DummyContent />,
  },
  {
    category: "Made with Love in India",
    title: "Our journey from handloom to your home.",
    src: "https://i.postimg.cc/pXFT0q3D/carouse-carousel-image-7.png",
    // content: <DummyContent />,
  }
];

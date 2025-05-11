"use client";
import React, { useEffect, useState } from "react";
import { FocusCards } from "@/app/components/core/focus-cards";
import { getCategories } from "@/app/utils/productUtils";
import Loader from "../components/core/loader";

export default function FocusCardsDemo() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 4000);
  }, []);
  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      const formatted = categories.map((cat) => ({
        title: cat.name,
        desc: cat.description,
        src:
          cat.image ||
          "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg", // fallback if no image
        link: `/product-listing?categoryId=${cat.id}`,
      }));
      setCards(formatted);
    };

    fetchCategories();
  }, []);

  return <>{loading ? <Loader /> : <FocusCards cards={cards} />}</>;
}

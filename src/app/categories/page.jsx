"use client";
import React, { useEffect, useState, useContext } from "react";
import { FocusCards } from "@/app/components/core/focus-cards";
import { getCategories } from "@/app/utils/productUtils";
import { AuthContext } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function FocusCardsDemo() {
  const [cards, setCards] = useState([]);

  const { userDetails } = useContext(AuthContext);
  const router = useRouter();

  const [isSeller, setisSeller] = useState(false);

  useEffect(() => {
    if (userDetails?.userInfo.role === "seller") {
      setisSeller(true);
    }
  }, [userDetails]);

  useEffect(() => {
    if (isSeller) {
      router.replace("/product-listing?seller=true");
    }
  }, [isSeller, router]);

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

  return <FocusCards cards={cards} />;
}

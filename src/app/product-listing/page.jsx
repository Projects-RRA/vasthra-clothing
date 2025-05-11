import React from "react";
import {
  getAllProducts,
  getProductsByCategory,
} from "@/app/utils/productUtils";
import ProductListingClient from "./components/ProductListingClient";
import { getUserFromServer } from "@/app/utils/getUserFromServer";

export default async function ProductListingPage({ searchParams }) {
  const { categoryId, isFeatured } = await searchParams;
  const user = await getUserFromServer();

  let products = [];

  if (isFeatured) {
    // Added this for time being
    products = await getFeaturedProducts();
  } else if (categoryId) {
    products = await getProductsByCategory(categoryId);
  } else {
    products = await getAllProducts();
  }

  return (
    <ProductListingClient
      products={products}
      categoryId={categoryId}
      isFeatured={isFeatured}
      user={user}
    />
  );
}

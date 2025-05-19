"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "@/app/components/core/product-card";
import Loader from "@/app/components/core/loader";
import { getSellerProducts } from "@/app/utils/sellerUtils";
import { useRouter } from "next/navigation";

export default function ProductListingClient({
  products: initialProducts,
  categoryId,
  isFeatured,
  user,
  seller,
}) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(initialProducts);
  const [isSeller, setisSeller] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (user?.role === "seller") {
      setisSeller(true);
    }
  }, [user]);

  // Un comment if you want redirection optiob for the seller
  // useEffect(() => {
  //   if (isSeller) {
  //     router.replace("/product-listing?seller=true");
  //   }
  // }, [isSeller, router]);

  useEffect(() => {
    async function fetchSellerProducts() {
      try {
        const sellerProducts = await getSellerProducts();
        setProducts(sellerProducts);
      } catch (error) {
        console.error("Error fetching seller products:", error);
      }
    }

    if (seller) {
      fetchSellerProducts();
    }
  }, [seller]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6 text-gray-900">
            {isFeatured
              ? "Featured Products"
              : categoryId
              ? "Filtered Products"
              : "All Products"}
          </h1>
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 text-center">
              <img
                src="/images/fallBackImage.png" // Use a fun illustration (e.g., empty box, magnifying glass)
                alt="No Product Found"
                className="h-64 mb-6"
              />
              <h1 className="text-3xl font-semibold text-gray-800 mb-2">
                Oops! Product not found
              </h1>
              <p className="text-gray-600 mb-6">
                The product you're looking for might have been removed, renamed,
                or is temporarily unavailable.
              </p>
              <div className="flex gap-4">
                <a
                  href="/"
                  className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
                >
                  Back to Home
                </a>
                <a
                  href="/categories"
                  className="border border-black text-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition"
                >
                  Browse Products
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} user={user} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

"use client";
import React from "react";
import Link from "next/link";

export default function ProductCard({ product,user }) {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden">
      <Link href={`/product/${product.id}`}>
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-64 object-contain"
        />
      </Link>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h2>
        <p className="text-gray-600 mt-1 text-sm">Size: {product.size}</p>
        <p className="text-gray-600 text-sm capitalize">
          For: {product.target_audience}
        </p>
        <p className="text-green-700 font-semibold mt-2 text-lg">
          ₹ {parseFloat(product.price).toFixed(2)}
        </p>
        {user?.role === "buyer" && (
          <button className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800">
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

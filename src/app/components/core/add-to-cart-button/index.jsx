"use client";

import { useState } from "react";
import { addToCart } from "@/app/utils/cartUtils";
import { useCart } from "@/app/context/CartContext";
import Toast from "@/app/components/core/toast/Toast";

export default function AddToCartButton({
  productId,
  quantity = 1,
  className = "",
}) {
  const { loadCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await addToCart(productId, 1, setToast);
      await loadCart();
    } catch (error) {
      alert("Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className={`bg-black text-white rounded hover:bg-gray-800 transition ${className}`}
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>
      {toast && <Toast key={toast.title} {...toast} />}
    </>
  );
}

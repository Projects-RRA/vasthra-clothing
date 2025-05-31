"use client";

import { useState, useEffect, useContext } from "react";
import { useCart } from "@/app/context/CartContext";
import { AuthContext } from "@/app/context/AuthContext";
import Modal from "@/app/components/core/modal";
import Link from "next/link";
import {
  updateCartItem,
  deleteCartItem,
  clearCart,
} from "@/app/utils/cartUtils";
import { FaTrash } from "react-icons/fa";
import Toast from "@/app/components/core/toast/Toast";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cartItems, loadCart } = useCart();
  const { userDetails } = useContext(AuthContext);
  const router = useRouter();

  const [toast, setToast] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [isSeller, setisSeller] = useState(false);

  useEffect(() => {
    if (userDetails?.userInfo.role === "seller") {
      setisSeller(true);
    }
  }, [userDetails]);

  useEffect(() => {
    if (isSeller) {
      router.replace("/");
    }
  }, [isSeller, router]);


  const handleQuantityChange = async (productId, newQty) => {
    if (newQty < 1) {
      await deleteCartItem(productId, setToast);
      await loadCart();
      return;
    }
    await updateCartItem(productId, newQty, setToast);
    await loadCart();
  };

  const handleDelete = async (productId) => {
    await deleteCartItem(productId, setToast);
    await loadCart();
  };

  const handleClearCartButton = async () => {
    setShowDeleteModal(true);
  };
  const handleClearCart = async () => {
    await clearCart();
    await loadCart();
    setShowDeleteModal(false);
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.quantity * parseFloat(item.price),
    0
  );

  return (
    <div className="container mx-auto px-4 py-8 mt-10 min-h-[50vh]">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-900">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Cart Items */}
          <div className="flex-1 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.product_id}
                className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md"
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-20 h-20 object-contain"
                  />
                  <div>
                    <h2 className="font-semibold text-lg text-gray-900 break-words whitespace-normal">
                      <Link
                        href={`/product/${item.product_id}`}
                        className="hover:underline hover:text-blue-600"
                      >
                        {item.name}
                      </Link>
                    </h2>

                    <p className="text-sm text-green-900">
                      ₹ {parseFloat(item.price).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-4 md:mt-0">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.product_id, item.quantity - 1)
                    }
                    className="px-3 py-1 bg-gray-900 rounded hover:bg-gray-600"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-gray-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.product_id, item.quantity + 1)
                    }
                    className="px-3 py-1 bg-gray-900 rounded hover:bg-gray-600"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleDelete(item.product_id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={handleClearCartButton}
              className="text-sm text-red-600 hover:text-red-800 underline"
            >
              Clear Cart
            </button>
          </div>

          {/* Right: Summary */}
          <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-md h-60">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Cart Summary
            </h2>
            <p className="text-sm mb-2 text-gray-900">
              Items:{" "}
              <span className="font-medium">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            </p>
            <p className="text-sm mb-4 text-gray-900">
              Total:{" "}
              <span className="font-semibold text-lg text-green-900">
                ₹ {totalAmount.toFixed(2)}
              </span>
            </p>
            <a href="/checkout">
              <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
                Checkout
              </button>
            </a>
          </div>
        </div>
      )}
      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Clear Cart"
      >
        <p>Are you sure you want to Clear the cart</p>
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleClearCart}
          >
            Delete
          </button>
        </div>
      </Modal>
      {toast && <Toast key={toast.id} {...toast} />}
    </div>
  );
}

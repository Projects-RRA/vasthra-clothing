"use client";
import React, { useContext, useEffect, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { AuthContext } from "@/app/context/AuthContext";
import Toast from "@/app/components/core/toast/Toast";
import { placeOrder } from "@/app/utils/orderUtils";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cartItems } = useCart();
  const { userDetails } = useContext(AuthContext);
  const router = useRouter();

  const [toast, setToast] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("cod");
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


  useEffect(() => {
    if (userDetails) {
      setAddresses(userDetails.addresses || []);
    }
  }, [userDetails]);

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      setToast({
        id: Date.now(),
        title: "Select Address.",
        description: "Please select an address before placing the order.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-center",
      });
      return;
    }
    try {
      const response = await placeOrder({
        items: cartItems,
        addressId: selectedAddress,
        paymentMethod: selectedPayment,
      });

      setToast({
        id: Date.now(),
        title: "Order Placed.",
        description: "Order Placed Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-center",
      });
      router.push(`/orders/${response.orderId}`);
      // Optionally redirect or show confirmation toast
    } catch (error) {
      console.error("Order failed:", error.message);
      // Show error toast
    }
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.quantity * parseFloat(item.price),
    0
  );


  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-16">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Items and Address */}
        <div className="lg:col-span-2 space-y-8">
          {/* Cart Items */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Your Items
            </h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              cartItems.map((item, index) => (
                <div
                  key={item.id ?? `cart-item-${index}`}
                  className="flex justify-between items-center border-b py-4"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium text-gray-900">₹{item.price}</p>
                </div>
              ))
            )}
          </div>

          {/* Select Address */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Select Address
            </h2>
            {addresses.length > 0 ? (
              addresses.map((addr) => (
                <div key={addr.id} className="mb-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="address"
                      value={addr.id}
                      checked={selectedAddress === addr.id}
                      onChange={() => setSelectedAddress(addr.id)}
                      className="mt-1"
                    />
                    <div>
                      <p className="font-medium text-gray-900">
                        {addr.street}, {addr.landmark}
                      </p>
                      <p className="text-sm text-gray-700">
                        {addr.city}, {addr.state}, {addr.country} -{" "}
                        {addr.postal_code}
                      </p>
                    </div>
                  </label>
                </div>
              ))
            ) : (
              <p className="text-gray-600">
                No addresses found in your profile.
              </p>
            )}
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Payment Method
            </h2>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={selectedPayment === "cod"}
                onChange={() => setSelectedPayment("cod")}
              />
              <span className="text-gray-800 font-medium">
                Cash on Delivery (COD)
              </span>
            </label>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Order Summary
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full table-auto text-left border-collapse">
              <thead>
                <tr className="text-sm font-semibold text-gray-700 border-b">
                  <th className="pb-2">Product</th>
                  <th className="pb-2 text-center">Qty</th>
                  <th className="pb-2 text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr
                    key={item.id ?? `cart-item-${index}`}
                    className="text-sm border-b last:border-b-0"
                  >
                    <td className="py-2 text-gray-800">{item.name}</td>
                    <td className="py-2 text-center text-gray-700">
                      {item.quantity}
                    </td>
                    <td className="py-2 text-right text-gray-900 font-medium">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between border-t pt-4 mt-4">
            <span className="text-lg font-semibold text-gray-800">Total</span>
            <span className="text-lg font-bold text-gray-900">
              ₹ {totalAmount.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full mt-6 bg-black text-white font-medium py-3 rounded hover:bg-gray-800 transition"
          >
            Place Order
          </button>
        </div>
      </div>
      {toast && <Toast key={toast.id} {...toast} />}
    </div>
  );
}

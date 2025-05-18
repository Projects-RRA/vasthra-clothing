"use client";
import { use, useEffect, useState } from "react";
import { fetchOrderById } from "@/app/utils/orderUtils";
import Loader from "@/app/components/core/loader";

export default function OrderDetailsPage({ params }) {
  const { orderId } = use(params);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadOrder = async () => {
      setLoading(true);
      const data = await fetchOrderById(orderId);
      if (!data) {
        setNotFound(true);
      } else {
        setOrder(data);
      }
      setLoading(false);
    };

    if (orderId) {
      loadOrder();
    }
  }, [orderId]);

  if (loading) return <Loader />;

  if (notFound)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8 text-center">
        <img
          src="/images/fallBackImage.png"
          alt="No Order Found"
          className="h-64 mb-6"
        />
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          Order not found
        </h1>
        <p className="text-gray-600 mb-6">
          Hmm, we couldn’t find an order with that ID. It might be incorrect or
          no longer available.
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
    );

  const { street, city, state, country, postal_code, landmark } = JSON.parse(
    order?.address
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 text-gray-700 grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[55vh]">
      {/* Left Section - Items */}
      <div className="md:col-span-2 space-y-4">
        <h2 className="text-xl font-semibold">Items in this Order</h2>
        {order.items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 bg-white rounded-lg shadow"
          >
            <img
              src={item.image_url}
              alt={item.product_name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <p className="font-bold">{item.product_name}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              <p className="text-sm text-gray-500">₹{item.price_at_purchase}</p>
              {item.size && (
                <p className="text-sm text-gray-500">Size: {item.size}</p>
              )}
              {item.color && (
                <p className="text-sm text-gray-500">Color: {item.color}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Right Section - Summary */}
      <div className="bg-white p-6 rounded-lg shadow h-fit mt-10">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        <p className="mb-2 text-green-900">
          <strong>Order ID:</strong> {order.order_id}
        </p>
        <p className="mb-2">
          <strong>Status:</strong> {order.order_status}
        </p>
        <p className="mb-2">
          <strong>Payment Method:</strong> {order.payment_method}
        </p>
        <p className="mb-2">
          <strong>Total:</strong> ₹{order.total_amount}
        </p>
        <p className="mb-4">
          <strong>Placed At:</strong>{" "}
          {new Date(order.placed_at).toLocaleString()}
        </p>

        <div className="mb-4">
          <h3 className="font-semibold mb-1">Shipping Address</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {street}, {landmark && `${landmark}, `}
            {city}, {state} - {postal_code}, {country}
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchOrders } from "@/app/utils/orderUtils";
import Loader from "@/app/components/core/loader";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      const data = await fetchOrders();
      setOrders(data);
      setLoading(false);
    };
    loadOrders();
  }, []);
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 min-h-[55vh]">
      <h1 className="text-2xl font-semibold mb-4 text-gray-900">
        Order History
      </h1>

      <div className="overflow-x-auto text-gray-600">
        <table className="min-w-full border divide-y divide-gray-200 shadow rounded-xl">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Payment</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Placed At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="bg-white even:bg-gray-50 hover:bg-gray-100"
              >
                <td className="px-4 py-2 text-blue-600 underline">
                  <Link href={`/orders/${order.order_id}`}>
                    {order.order_id}
                  </Link>
                </td>
                <td className="px-4 py-2">₹{order.total_amount}</td>
                <td className="px-4 py-2">{order.payment_method}</td>
                <td className="px-4 py-2">{order.order_status}</td>
                <td className="px-4 py-2">
                  {new Date(order.placed_at).toLocaleString()}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td className="px-4 py-4 text-center text-gray-500" colSpan="5">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

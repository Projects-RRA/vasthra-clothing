export const placeOrder = async ({ items, addressId, paymentMethod }) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/placeOrder`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // important if using cookies for auth
        body: JSON.stringify({ items, addressId, paymentMethod }),
      }
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error?.error || "Failed to place order");
    }

    const data = await res.json();
    return data; // expected to contain { message, orderId }
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

// Get all orders for logged-in user
export const fetchOrders = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/getOrders`,
      { credentials: "include" }
    );

    if (!res.ok) {
      console.log("Failed to fetch orders");
    }
    const data = await res.json();
    return data.orders || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

// Get single order by ID (supports O-0002 or plain ID)
export const fetchOrderById = async (orderId) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/getOrder/${orderId}`,
      { credentials: "include" }
    );
    const data = await res.json();

    if (!res.ok) throw new Error("Failed to fetch order");
    return data.order || null;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
};

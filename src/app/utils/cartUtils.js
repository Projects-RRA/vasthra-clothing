export const fetchCartItems = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/getCartItems`,
      {
        credentials: "include",
      }
    );

    if (!res.ok){
      console.log("Failed to fetch cart");
    }

    const data = await res.json();
    return data.cart || [];
  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
};

export const addToCart = async (productId, quantity = 1, setToast) => {
  setToast(null);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/addItem`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important for sending cookies (auth)
        body: JSON.stringify({ product_id: productId, quantity }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to add to cart");
    }

    if (setToast) {
      setToast({
        id: Date.now(),
        title: "Added to Cart",
        description: "Product successfully added to cart.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-center",
      });
    }

    return true;
  } catch (err) {
    if (setToast) {
      setToast({
        id: Date.now(),
        title: "Error",
        description: err.message || "Could not add item to cart.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-center",
      });
    }

    return false;
  }
};

export const updateCartItem = async (productId, newQuantity, setToast) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/updateItem`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          product_id: productId,
          quantity: newQuantity,
        }),
      }
    );

    const data = await response.json(); // Always attempt to parse the response

    if (!response.ok || data.status === "out_of_stock") {
      setToast({
        id: Date.now(),
        title: "Cart Update Failed",
        description:
          data.message || "Something went wrong while updating the cart.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-center",
      });
      throw new Error(data.message || "Cart update failed");
    }

    // Success case
    setToast({
      id: Date.now(),
      title: "Cart Updated.",
      description:
        data.message || "The item quantity has been successfully updated.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-center",
    });

    return data;
  } catch (error) {
    // Catch fetch-level or parsing errors
    setToast({
      id: Date.now(),
      title: "Error",
      description: error.message || "Error updating cart item.",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top-center",
    });
    console.error("Error updating cart item:", error);
    throw error;
  }
};

export const deleteCartItem = async (productId, setToast) => {
  setToast(null);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/removeItem/${productId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!res.ok) {
      console.log("Failed to delete item");
    }

    const data = await res.json();

    setToast({
      id: Date.now(),
      title: "Item removed.",
      description: "Item removed from cart.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-center",
    });

    return data;
  } catch (error) {
    console.error("Error deleting item:", error);
    setToast({
      id: Date.now(),
      title: "Error",
      status: "failure",
      description: "Failed to remove item. Please try again.",
    });
    throw error;
  }
};

export const clearCart = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/clearCart`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (!res.ok) throw new Error("Failed to clear cart");
    return await res.json();
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};

// utils/uploadProduct.js

export const uploadProduct = async (productData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/seller/addProducts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(productData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    return { success: true, message: data.message };
  } catch (error) {
    console.error("Upload product error:", error);
    return {
      success: false,
      message: error.message || "Something went wrong while uploading.",
    };
  }
};

export async function getSellerProducts() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/seller/products`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) throw new Error("Failed to fetch seller's products");

    const data = await response.json();

    return data.products;
  } catch (error) {
    console.error("Error fetching seller products:", error);
    return [];
  }
}

// Search
export async function searchProducts({ id = "", name = "" }) {
  const params = new URLSearchParams();
  if (id) params.append("id", id);
  if (name) params.append("name", name);
  // if (category_id) params.append("category_id", category_id);

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_BASE_URL
    }/seller/products/search?${params.toString()}`,
    {
      credentials: "include",
    }
  );
  return await res.json();
}

// Update Product
export async function updateProduct(productId, productData, setToast) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/seller/products/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(productData),
      }
    );

    const data = await res.json();

    if (res.ok) {
      setToast({
        id: Date.now(),
        title: "Product Updated.",
        description: "The product details were successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-center",
      });
    } else {
      setToast({
        id: Date.now(),
        title: "Update Failed",
        description: data?.error || "Failed to update the product.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-center",
      });
    }

    return data;
  } catch (error) {
    console.error("Update product error:", error);
    setToast({
      id: Date.now(),
      title: "Update Error",
      description: "Something went wrong while updating the product.",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top-center",
    });
    return { error: "Network or server error" };
  }
}

// Delete Product
export async function deleteProduct(productId, setToast) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/seller/products/${productId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const data = await res.json();
    console.log("Rinith--->", res, res.ok);

    if (res.ok) {
      setToast({
        id: Date.now(),
        title: "Product Removed.",
        description: "The product was successfully deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-center",
      });
    } else {
      setToast({
        id: Date.now(),
        title: "Delete Failed",
        description: data?.error || "Failed to delete the product.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-center",
      });
    }

    return data;
  } catch (error) {
    console.error("Delete product error:", error);
    setToast({
      id: Date.now(),
      title: "Delete Error",
      description: "Something went wrong while deleting the product.",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top-center",
    });
    return { error: "Network or server error" };
  }
}

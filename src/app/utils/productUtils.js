export const getCategories = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/categories`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error("Failed to fetch categories");

    const data = await res.json();
    return data?.categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// Get all products
export const getAllProducts = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/products`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error("Failed to fetch all products");

    const data = await res.json();
    return data?.products || [];
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
};

// Get products by category ID
export const getProductsByCategory = async (id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/products/category/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error(`Failed to fetch products for category ${id}`);

    const data = await res.json();
    return data?.products || [];
  } catch (error) {
    console.error(`Error fetching products for category ${id}:`, error);
    return [];
  }
};

// Get products by product ID
export const getProductById = async (productId) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/products/${productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const data = await res.json();

    if (res.status === 404) {
      console.log("Product not found in response:", data);
      return null;
    }
    return data?.product || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

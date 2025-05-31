"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/app/utils/sellerUtils";
import { getProductById } from "@/app/utils/productUtils";
import Toast from "@/app/components/core/toast/Toast";

export default function EditProductPage({ params }) {
  const { id: productId } = use(params);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    category_id: "",
    image_url: "",
    size: "",
    color: "",
    is_active: true,
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductById(productId);
        setFormData(data);
      } catch (err) {
        alert(err.message || "Failed to fetch product");
      } 
    }

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(productId, formData, setToast);
      setTimeout(() => {
        router.push(`/product/${productId}`);
      }, 2000);
    } catch (err) {
      alert("Update failed: " + err.message);
    }
  };


  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8 text-gray-800 mt-6 mb-12">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Edit Product #{productId}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { label: "Name", name: "name" },
            { label: "Price", name: "price", type: "number" },
            { label: "Stock", name: "stock", type: "number" },
            { label: "Category ID", name: "category_id" },
            { label: "Size", name: "size" },
            { label: "Color", name: "color" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-gray-400 focus:outline-none text-gray-800 placeholder-gray-400"
                required
              />
            </div>
          ))}

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-gray-400 focus:outline-none text-gray-800 placeholder-gray-400"
            ></textarea>
          </div>

          {/* Image URL and Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Image URL
            </label>
            <input
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-gray-400 focus:outline-none text-gray-800 placeholder-gray-400"
            />
            {formData.image_url && (
              <img
                src={formData.image_url}
                alt="Preview"
                className="mt-4 max-h-64 w-full object-contain border rounded-md"
              />
            )}
          </div>

          {/* Active Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-400"
            />
            <label htmlFor="is_active" className="text-sm text-gray-700">
              Active
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
      {toast && <Toast key={toast.id} {...toast} />}
    </div>
  );
}

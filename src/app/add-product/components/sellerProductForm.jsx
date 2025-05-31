"use client";
import { useState } from "react";
import { uploadProduct } from "@/app/utils/sellerUtils";
import { useRouter } from "next/navigation";
import { FaTag, FaImage, FaBoxOpen, FaPalette } from "react-icons/fa";

const categories = [
  { id: 2, name: "Men" },
  { id: 3, name: "Women" },
  { id: 4, name: "Kids" },
];

const categoryIdToAudience = {
  2: "Men",
  3: "Women",
  4: "Kids",
};

const sizes = ["S", "M", "L", "XL"];

export default function UploadProduct() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    stock: "",
    image_url: "",
    size: "",
    color: "",
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === "image_url") setPreview(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    const targetAudience =
      categoryIdToAudience[parseInt(formData.category_id)] || "UniSex";

    const payload = {
      ...formData,
      target_audience: targetAudience,
    };
    console.log("Rinith--->", payload);
    

    const res = await uploadProduct(payload);

    if (res.success) {
      setMessage({
        type: "success",
        text: "✅ Product uploaded successfully!",
      });
      setTimeout(() => router.push("/product-listing?seller=true"), 1500);
    } else {
      setMessage({ type: "error", text: "❌ Failed to upload. Try again!" });
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-8 animate-fade-in text-gray-600">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-gray-600 mt-2">
          Fill the details to showcase your product in Vasthra Store
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl p-8 rounded-xl space-y-6 border border-gray-100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field
            label="Product Name"
            name="name"
            icon={<FaTag />}
            value={formData.name}
            onChange={handleChange}
          />

          <Field
            label="Price (₹)"
            name="price"
            type="number"
            icon="₹"
            value={formData.price}
            onChange={handleChange}
          />

          <div>
            <label className="text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <Field
            label="Stock"
            name="stock"
            type="number"
            icon={<FaBoxOpen />}
            value={formData.stock}
            onChange={handleChange}
          />

          <div>
            <label className="text-sm font-medium text-gray-700">Size</label>
            <select
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Choose Size</option>
              {sizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <Field
            label="Color"
            name="color"
            icon={<FaPalette />}
            value={formData.color}
            onChange={handleChange}
          />

          <Field
            label="Image URL"
            name="image_url"
            icon={<FaImage />}
            value={formData.image_url}
            onChange={handleChange}
          />

          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              rows="3"
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>
        </div>

        {preview && (
          <div className="sm:col-span-2">
            <p className="text-sm text-gray-600 mb-1">Preview:</p>
            <img
              src={preview}
              alt="Preview"
              className="max-w-xs rounded-lg border shadow-md"
            />
          </div>
        )}

        {message.text && (
          <p
            className={`text-sm ${
              message.type === "error" ? "text-red-500" : "text-green-600"
            }`}
          >
            {message.text}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-gray-900 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition"
        >
          {loading ? "Uploading..." : "Upload Product"}
        </button>
      </form>
    </div>
  );
}

// Reusable input field
function Field({ label, name, type = "text", value, onChange, icon }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center mt-1">
        <span className="inline-flex items-center px-2 bg-gray-100 text-gray-500 rounded-l-md border border-r-0 border-gray-300 h-10">
          {icon}
        </span>
        <input
          type={type}
          name={name}
          required
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { searchProducts, deleteProduct } from "@/app/utils/sellerUtils";
import Modal from "@/app/components/core/modal";
import Toast from "@/app/components/core/toast/Toast";

export default function ManageProductsPage() {
  const [searchParams, setSearchParams] = useState({ id: "", name: "" });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toast, setToast] = useState(null);

  const handleInputChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await searchProducts(searchParams);
      setProducts(results);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (productId) => {
    setProductToDelete(productId);
    setShowDeleteModal(true);
  };

  const performDelete = async () => {
    try {
      const res = await deleteProduct(productToDelete,setToast);
      setProducts(products.filter((p) => p.id !== productToDelete));
    } catch (err) {
      setToast({
        id: Date.now(),
        title: "Error.",
        description: `Failed to delete product: ${err.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 text-gray-800 min-h-[55vh]">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Manage Your Products
      </h2>

      {/* Search Section */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          name="id"
          placeholder="Product ID"
          value={searchParams.id}
          onChange={handleInputChange}
          className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={searchParams.name}
          onChange={handleInputChange}
          className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-600 transition"
        >
          {loading ? "Searching..." : "Search"}
        </button>
        {toast && <Toast key={toast.id} {...toast} />}
      </div>

      {/* Results Table */}
      {products.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-gray-100 text-gray-800">
              <tr>
                <th className="text-left px-6 py-3 font-semibold">ID</th>
                <th className="text-left px-6 py-3 font-semibold">Name</th>
                <th className="text-left px-6 py-3 font-semibold">Price</th>
                <th className="text-left px-6 py-3 font-semibold">Stock</th>
                <th className="text-left px-6 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{prod.id}</td>
                  <td className="px-6 py-3">{prod.name}</td>
                  <td className="px-6 py-3">₹{prod.price}</td>
                  <td className="px-6 py-3">{prod.stock}</td>
                  <td className="px-6 py-3 space-x-3">
                    <a
                      href={`/edit-product/${prod.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </a>
                    <button
                      onClick={() => confirmDelete(prod.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Delete Modal */}
          <Modal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            title="Confirm Delete Product"
          >
            <p>Are you sure you want to delete this product?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={performDelete}
              >
                OK
              </button>
            </div>
          </Modal>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">No products found.</p>
      )}
    </div>
  );
}

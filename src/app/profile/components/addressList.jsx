import React, { useState } from "react";
import Modal from "@/app/components/core/modal";
import { FaPlus, FaTrash } from "react-icons/fa";
import {
  addAddress,
  deleteAddress,
  updateAddress,
} from "@/app/utils/profileUtils";

const AddressList = ({ addresses, setAddresses, setToast }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [address, setAddress] = useState({
    street: "",
    landmark: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
  });
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addAddress(address, setAddresses, setToast);
    setShowAddModal(false);
  };

  const handleAddressClick = (addr) => {
    setSelectedAddress(addr);
    setShowEditModal(true);
  };

  const handleDeleteAddressClick = (e, addr) => {
    e.stopPropagation();
    setToast(null);
    setSelectedAddress(addr);
    setShowDeleteModal(true);
  };

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    setToast(null);
    const success = await updateAddress(
      selectedAddress,
      setAddresses,
      setToast
    );
    await updateAddress(selectedAddress, setAddresses, setToast);
    if (success) {
      setShowEditModal(false);  // close if update was successful
    }
  };

  const handleDelete = async () => {
    await deleteAddress(selectedAddress.id, setAddresses, setToast);
    setShowDeleteModal(false);
  };

  return (
    <>
      {/* Main Display: Heading + Cards */}
      <div className="bg-white p-4 rounded shadow-md mt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Addresses</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="text-gray-900 flex items-center"
          >
            <FaPlus className="mr-1" /> Add New Address
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses?.map((addr) => (
            <div
              key={addr.id}
              className="border p-4 rounded shadow-md relative cursor-pointer"
              onClick={() => handleAddressClick(addr)}
            >
              <button
                onClick={(e) => handleDeleteAddressClick(e, addr)}
                className="absolute top-2 right-2 text-red-500"
              >
                <FaTrash />
              </button>
              <p>
                <strong>Street:</strong> {addr.street}
              </p>
              <p>
                <strong>Landmark:</strong> {addr.landmark}
              </p>
              <p>
                <strong>City:</strong> {addr.city}
              </p>
              <p>
                <strong>State:</strong> {addr.state}
              </p>
              <p>
                <strong>Country:</strong> {addr.country}
              </p>
              <p>
                <strong>Pin:</strong> {addr.postal_code}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Address Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Address"
      >
        <form onSubmit={handleSubmit}>
          <input
            name="street"
            onChange={handleChange}
            placeholder="Street"
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            name="landmark"
            onChange={handleChange}
            placeholder="Landmark"
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            name="city"
            onChange={handleChange}
            placeholder="City"
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            name="state"
            onChange={handleChange}
            placeholder="State"
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            name="country"
            onChange={handleChange}
            placeholder="Country"
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            name="postal_code"
            onChange={handleChange}
            placeholder="Pin Code"
            className="w-full p-2 border rounded mb-2"
            required
          />
          <button
            type="submit"
            className="bg-gray-900 text-white p-2 rounded w-full"
          >
            Save Address
          </button>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Address"
      >
        <form>
          <label className="block text-sm font-medium mb-1">Street</label>
          <input
            type="text"
            value={selectedAddress?.street || ""}
            onChange={(e) =>
              setSelectedAddress({ ...selectedAddress, street: e.target.value })
            }
            className="w-full p-2 border rounded mb-2"
          />

          <label className="block text-sm font-medium mb-1">Landmark</label>
          <input
            type="text"
            value={selectedAddress?.landmark || ""}
            onChange={(e) =>
              setSelectedAddress({
                ...selectedAddress,
                landmark: e.target.value,
              })
            }
            className="w-full p-2 border rounded mb-2"
          />

          <label className="block text-sm font-medium mb-1">City</label>
          <input
            type="text"
            value={selectedAddress?.city || ""}
            onChange={(e) =>
              setSelectedAddress({
                ...selectedAddress,
                landmark: e.target.value,
              })
            }
            className="w-full p-2 border rounded mb-2"
          />

          <label className="block text-sm font-medium mb-1">State</label>
          <input
            type="text"
            value={selectedAddress?.state || ""}
            onChange={(e) =>
              setSelectedAddress({ ...selectedAddress, state: e.target.value })
            }
            className="w-full p-2 border rounded mb-2"
          />

          <label className="block text-sm font-medium mb-1">Country</label>
          <input
            type="text"
            value={selectedAddress?.country || ""}
            onChange={(e) =>
              setSelectedAddress({
                ...selectedAddress,
                country: e.target.value,
              })
            }
            className="w-full p-2 border rounded mb-2"
          />

          <label className="block text-sm font-medium mb-1">Postal Code</label>
          <input
            type="text"
            value={selectedAddress?.postal_code || ""}
            onChange={(e) =>
              setSelectedAddress({
                ...selectedAddress,
                postal_code: e.target.value,
              })
            }
            className="w-full p-2 border rounded mb-2"
          />

          <button
            type="button"
            className="bg-gray-900 text-white p-2 rounded w-full"
            onClick={handleUpdateAddress}
          >
            Update Address
          </button>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Delete"
      >
        <p>Are you sure you want to delete this address?</p>
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AddressList;

import { logout } from "./authUtils";

export const updateUser = async (updatedUser, setErrors, setToast) => {
  let newErrors = { name: "", phone: "" };
  setToast(null);

  if (!updatedUser.name) newErrors.name = "Name cannot be empty.";
  if (!updatedUser.phone) newErrors.phone = "Phone cannot be empty.";

  if (newErrors.name || newErrors.phone) {
    setErrors(newErrors);
    return;
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedUser),
      }
    );

    const data = await res.json();

    if (res.ok) {
      setToast({
        title: "Update Successful",
        description: "User details updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-center",
      });
      setErrors({ name: "", phone: "" });
    }
  } catch (err) {
    setToast({
      title: "Error",
      description: "Something went wrong.",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-center",
    });
  }
};

export const addAddress = async (newAddress, setAddresses, setToast) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/addresses`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newAddress),
      }
    );

    const data = await res.json();

    if (res.status === 201) {
      setToast({
        title: "Address Added",
        description: "Address added successfully",
        status: "success",
        duration: 5000,
      });
      setAddresses((prevAddresses) => [...prevAddresses, data?.address]);
    }
  } catch (error) {
    setToast({
      title: "Error",
      description: "Something went wrong.",
      status: "error",
      duration: 5000,
    });
  }
};

export const updateAddress = async (updatedAddress, setAddresses, setToast) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/addresses/${updatedAddress.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedAddress),
      }
    );

    const data = await res.json();

    if (res.status === 200) {
      setToast({
        title: "Address Updated",
        description: "Address updated successfully",
        status: "success",
        duration: 5000,
      });

      // Update the address in the list (optional, if address list is shown on screen)
      setAddresses((prev) =>
        prev.map((addr) => (addr.id === data.address.id ? data.address : addr))
      );

      return true;
    } else {
      throw new Error(data.message || "Failed to update address");
    }
  } catch (error) {
    setToast({
      title: "Error",
      description: error.message || "Something went wrong.",
      status: "error",
      duration: 5000,
    });
    return false; 
  }
};

export const deleteAddress = async (id, setAddresses, setToast) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/addresses/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (res.status === 200) {
      setAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address.id !== id)
      );
      setToast({
        title: "Address Deleted",
        description: "Address deleted successfully",
        status: "success",
        duration: 5000,
      });
    }
  } catch (error) {
    setToast({
      title: "Error",
      description: "Something went wrong.",
      status: "error",
      duration: 5000,
    });
  }
};

export const resetPassword = async (
  currentPassword,
  newPassword,
  confirmPassword,
  setToast
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/update-password`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Password update failed");

    setToast({
      title: "Success",
      description: "Password updated successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-center",
    });

    setTimeout(() => logout(), 2000);
  } catch (err) {
    setToast({
      title: "Error",
      description: err.message || "Something went wrong.",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-center",
    });
  }
};

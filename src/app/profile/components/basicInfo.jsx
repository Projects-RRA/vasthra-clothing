"use client";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { updateUser } from "@/app/utils/profileUtils";

export default function BasicInfo({ profile, setProfile, setToast }) {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({ name: "", phone: "" });

  const handleUpdate = async () => {
    await updateUser(profile, setErrors, setToast);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Basic Info</h2>
        <button onClick={() => (isEditing ? handleUpdate() : setIsEditing(true))} className="flex items-center gap-2">
          <FaEdit /> {isEditing ? "Save" : "Edit"}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={profile?.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            disabled={!isEditing}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <input type="email" className="w-full p-2 border rounded" value={profile?.email} disabled />
        <div>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={profile?.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            disabled={!isEditing}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
      </div>
    </div>
  );
}

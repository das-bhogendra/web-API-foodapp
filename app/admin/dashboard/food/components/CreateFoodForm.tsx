"use client";

import { useState } from "react";
import { foodApi } from "../../../../lib/foodApi";

interface Props {
  onSuccess?: () => void;
}

export default function CreateFoodForm({ onSuccess }: Props) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: "veg",
    available: true,
    bestSeller: false,
    image: null as File | null,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("type", formData.type);
      data.append("available", String(formData.available));
      data.append("bestSeller", String(formData.bestSeller));
      // ✅ IMPORTANT: Match backend field name
      if (formData.image) data.append("foodPhoto", formData.image);

      const token = localStorage.getItem("token") || "";
      await foodApi.create(data, token);

      onSuccess?.();
      alert("Food created successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to create food");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-6">Create New Food</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block mb-2 text-sm font-medium">Food Name</label>
          <input
            type="text"
            name="name"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Type */}
        <div>
          <label className="block mb-2 text-sm font-medium">Type</label>
          <select
            name="type"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="veg">Veg</option>
            <option value="nonVeg">Non-Veg</option>
            <option value="dessert">Dessert</option>
            <option value="drink">Drink</option>
          </select>
        </div>

        {/* Toggles */}
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
            />
            Available
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="bestSeller"
              onChange={handleChange}
            />
            Best Seller
          </label>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 text-sm font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition-all"
        >
          {loading ? "Creating..." : "Create Food"}
        </button>
      </form>
    </div>
  );
}
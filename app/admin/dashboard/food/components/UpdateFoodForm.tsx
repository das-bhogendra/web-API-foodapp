"use client";

import { useState } from "react";
import { foodApi } from "../../../../lib/foodApi";

import { FoodItem } from "../../../../context/FoodContext";

interface Props {
  food: FoodItem;
  onSuccess?: () => void;
}

export default function UpdateFoodForm({ food, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: food.name,
    price: food.price,
    type: food.type,
    available: food.isAvailable,
    bestSeller: food.isBestSeller,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert formData to FormData object for API
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", String(formData.price));
      data.append("type", formData.type);
      data.append("available", String(formData.available));
      data.append("bestSeller", String(formData.bestSeller));
      // You may need to provide a token if required by your API
      const token = localStorage.getItem("token") || "";
      await foodApi.update(food._id, data, token);
      onSuccess?.();
      alert("Food updated successfully");
    } catch (error) {
      console.error(error);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-6">Update Food</h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Name */}
        <div>
          <label className="block mb-2 text-sm font-medium">Food Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
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
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Type */}
        <div>
          <label className="block mb-2 text-sm font-medium">Type</label>
          <select
            name="type"
            value={formData.type}
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
              checked={formData.bestSeller}
              onChange={handleChange}
            />
            Best Seller
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition-all"
        >
          {loading ? "Updating..." : "Update Food"}
        </button>
      </form>
    </div>
  );
}
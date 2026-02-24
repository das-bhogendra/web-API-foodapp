"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { foodApi } from "../../../lib/foodApi";
import { FoodItem } from "../../../context/FoodContext";

const AdminFoodPage = () => {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const data = await foodApi.getAll(); // ✅ uses cookies automatically
      setFoods(data);
    } catch (error) {
      console.error("Error fetching foods:", error);
      alert("Failed to fetch food items");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this food item?")) return;

    try {
      // ✅ no token needed, cookies handle auth
      await foodApi.delete(id);
      fetchFoods(); // refresh list
    } catch (error) {
      console.error("Failed to delete food:", error);
      alert("Failed to delete food item");
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  if (loading) return <p className="p-4">Loading food items...</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Food Items</h1>
        <Link
          href="/admin/dashboard/food/create"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create New Food
        </Link>
      </div>

      {foods.length === 0 ? (
        <p>No food items available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {foods.map((food) => (
            <div key={food._id} className="border rounded p-2 shadow-md">
              <img
                src={food.imageUrl || "/food_photos/placeholder_food.jpg"}
                alt={food.name}
                className="w-full h-32 object-cover rounded"
              />
              <h3 className="font-semibold mt-2">{food.name}</h3>
              <p className="text-sm">{food.type}</p>
              <div className="mt-2 flex justify-between items-center">
                <span>${food.price}</span>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/dashboard/food/edit/${food._id}`} // ✅ edit link
                    className="text-blue-500 text-sm hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminFoodPage;
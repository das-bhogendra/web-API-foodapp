"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import UpdateFoodForm from "../components/UpdateFoodForm";
import { foodApi } from "../../../../lib/foodApi";
import { FoodItem } from "../../../../context/FoodContext";

const EditFoodPage = () => {
  const params = useParams();
  const router = useRouter();
  const [food, setFood] = useState<FoodItem | null>(null);
  const [loading, setLoading] = useState(true);

  const id = params.id as string;

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const data = await foodApi.getById(id);
        setFood(data);
      } catch (error) {
        console.error("Error fetching food:", error);
        alert("Failed to load food item");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchFood();
  }, [id]);

  const handleSuccess = () => {
    router.push("/admin/dashboard/food");
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!food) return <div className="p-4">Food item not found</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Food Item</h1>
      <UpdateFoodForm food={food} onSuccess={handleSuccess} />
    </div>
  );
};

export default EditFoodPage;
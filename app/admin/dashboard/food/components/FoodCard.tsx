// frontend/app/user/food/components/FoodCard.tsx
"use client";
import React from "react";
import { FoodItem } from "../../../../context/FoodContext";

interface Props {
  food: FoodItem;
}

const FoodCard: React.FC<Props> = ({ food }) => {
  return (
    <div className="border rounded p-4 shadow-md">
      <img
        src={food.imageUrl || "/public/food_photos/placeholder_food.jpg"}
        alt={food.name}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="text-lg font-semibold mt-2">{food.name}</h3>
      <p className="text-sm text-gray-600">{food.description}</p>
      <div className="mt-2 flex justify-between items-center">
        <span className="font-bold">${food.price}</span>
        {food.isBestSeller && <span className="text-xs bg-yellow-200 px-2 rounded">Best Seller</span>}
        {food.isDiscounted && <span className="text-xs bg-green-200 px-2 rounded">Discount</span>}
      </div>
    </div>
  );
};

export default FoodCard;
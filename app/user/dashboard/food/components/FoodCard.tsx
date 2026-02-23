// frontend/app/user/food/components/FoodCard.tsx
"use client";
import React from "react";
import { FoodItem } from "../../../../context/FoodContext";
import { useCart } from "../../../../context/CartContext";

interface Props {
  food: FoodItem;
}

const FoodCard: React.FC<Props> = ({ food }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(food);
  };

  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow bg-white">
      <img
        src={food.imageUrl || "/placeholder-food.jpg"}
        alt={food.name}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="text-lg font-semibold mt-2">{food.name}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">{food.description}</p>
      <div className="mt-2 flex justify-between items-center">
        <span className="font-bold text-lg">${food.price}</span>
        <div className="flex gap-1">
          {food.isBestSeller && <span className="text-xs bg-yellow-200 px-2 py-1 rounded">Best Seller</span>}
          {food.isDiscounted && <span className="text-xs bg-green-200 px-2 py-1 rounded">Discount</span>}
        </div>
      </div>
      <button
        onClick={handleAddToCart}
        className="mt-3 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        disabled={!food.isAvailable}
      >
        {food.isAvailable ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
};

export default FoodCard;
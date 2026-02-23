"use client";
import React, { useState, useEffect } from "react";
import { FoodProvider, useFood } from "@/app/context/FoodContext";
import { CategoryProvider, useCategory } from "../../../context/CategoryContext";
import FoodList from "./components/FoodList";
import CategoryFilter from "./components/CategoryFilter";

const FoodPageInner = () => {
  const { foods } = useFood();
  const { categories } = useCategory();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>("");
  const [showBestSellers, setShowBestSellers] = useState(false);
  const [showDiscounted, setShowDiscounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFoods, setFilteredFoods] = useState(foods);

  useEffect(() => {
    let filtered = foods;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((f) => f.type === selectedCategory);
    }

    // Filter by type
    if (selectedType) {
      filtered = filtered.filter((f) => f.type === selectedType);
    }

    // Filter by best sellers
    if (showBestSellers) {
      filtered = filtered.filter((f) => f.isBestSeller);
    }

    // Filter by discounted
    if (showDiscounted) {
      filtered = filtered.filter((f) => f.isDiscounted);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((f) =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredFoods(filtered);
  }, [selectedCategory, selectedType, showBestSellers, showDiscounted, searchTerm, foods]);

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search foods..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-4">
        <CategoryFilter
          categories={categories}
          selectedCategoryId={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Types</option>
            <option value="veg">Veg</option>
            <option value="nonVeg">Non-Veg</option>
            <option value="dessert">Dessert</option>
            <option value="drink">Drink</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="bestSellers"
            checked={showBestSellers}
            onChange={(e) => setShowBestSellers(e.target.checked)}
          />
          <label htmlFor="bestSellers" className="text-sm">Best Sellers</label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="discounted"
            checked={showDiscounted}
            onChange={(e) => setShowDiscounted(e.target.checked)}
          />
          <label htmlFor="discounted" className="text-sm">Discounted</label>
        </div>
      </div>

      <FoodList foods={filteredFoods} />
    </div>
  );
};

const FoodPage = () => {
  return (
    <CategoryProvider>
      <FoodProvider>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Our Menu</h1>
          <FoodPageInner />
        </div>
      </FoodProvider>
    </CategoryProvider>
  );
};

export default FoodPage;
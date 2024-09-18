import { useEffect, useState } from "react";
import { getCategories } from "../API/API";

interface Category {
  slug: string;
  name: string;
  url: string;
}

interface FilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

function Filter({
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
  selectedCategory,
  setSelectedCategory,
}: FilterProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 p-4  rounded-lg shadow-md">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products..."
        className="border border-gray-300 p-2 rounded-lg w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Sort By</option>
        <option value="title-asc">Title: Low to High</option>
        <option value="title-desc">Title: High to Low</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-asc">Rating: Low to High</option>
        <option value="rating-desc">Rating: High to Low</option>
      </select>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;

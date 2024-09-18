import { useEffect, useState } from "react";
import axios from "axios";

interface FilterProps {
  onFilterChange: (filters: {
    search: string;
    sortBy: string;
    order: string;
    category: string | null;
  }) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState("asc");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((response) => {
        setCategories(response.data);
        setLoadingCategories(false);
      })
      .catch(() => {
        setCategories([]);
        setLoadingCategories(false);
      });
  }, []);

  const handleSearch = () => {
    onFilterChange({
      search: query,
      sortBy,
      order,
      category: selectedCategory,
    });
  };

  const handleSort = () => {
    onFilterChange({
      search: query,
      sortBy,
      order,
      category: selectedCategory,
    });
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    onFilterChange({
      search: query,
      sortBy,
      order,
      category,
    });
  };

  if (loadingCategories) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="mb-4">
      {/* Search Input */}
      <div className="flex mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="border border-gray-300 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Sort Controls */}
      <div className="flex mb-4 items-center">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="title">Title</option>
          <option value="price">Price</option>
          {/* Add more sorting options if needed */}
        </select>
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="border border-gray-300 rounded-r-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <button
          onClick={handleSort}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sort
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Filter by Category</h3>
        <ul className="list-none">
          <li>
            <button
              onClick={() => handleCategoryChange(null)}
              className={`text-blue-500 hover:underline ${
                selectedCategory === null ? "font-bold" : ""
              }`}
            >
              All Categories
            </button>
          </li>
          {categories.map((category) => (
            <li key={category} className="mb-2">
              <button
                onClick={() => handleCategoryChange(category)}
                className={`text-blue-500 hover:underline ${
                  selectedCategory === category ? "font-bold" : ""
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Filter;

import { useEffect, useState } from "react";
import { Product } from "../../Types/Types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { useCartDispatch } from "../../Hooks/useCartDispatch";
import { getProducts, searchProducts } from "../../API/API";
import useDebounce from "../../Hooks/useDebounce";

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const limit = 9;
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (debouncedSearchQuery) {
          setSearchLoading(true);
          const response = await searchProducts(debouncedSearchQuery);
          if (response.data.products && Array.isArray(response.data.products)) {
            setSearchResults(response.data.products);
          } else {
            throw new Error("Invalid response format");
          }
          setSearchLoading(false);
        } else {
          const skip = (currentPage - 1) * limit;
          const response = await getProducts(skip, limit);
          if (response.data.products && Array.isArray(response.data.products)) {
            setProducts(response.data.products);
            const totalProducts =
              response.data.total || response.data.products.length;
            setTotalPages(Math.ceil(totalProducts / limit));
          } else {
            throw new Error("Invalid response format");
          }
        }
      } catch {
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
        setSearchLoading(false);
      }
    };

    fetchData();
  }, [currentPage, debouncedSearchQuery]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const dispatch = useCartDispatch();

  const handleAddToCart = (product: Product) => {
    dispatch({ type: "ADD_TO_CART", product: { ...product, quantity: 1 } });
  };

  if (loading || searchLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="p-6 w-full max-w-6xl">
          <h2 className="text-4xl font-extrabold mb-6 text-center">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: limit }).map((_, index) => (
              <div
                key={index}
                className="bg-white border rounded-lg shadow-md overflow-hidden"
              >
                <Skeleton height={256} />
                <div className="p-4">
                  <Skeleton height={24} width="80%" />
                  <Skeleton height={16} count={3} />
                  <Skeleton height={20} width="40%" />
                  <Skeleton height={20} width="60%" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error)
    return <div className="text-center py-6 text-red-500">{error}</div>;

  return (
    <div className="flex items-center justify-center">
      <div className="p-6 w-full max-w-6xl">
        <h2 className="text-4xl font-extrabold mb-6 text-center">Products</h2>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded mb-6"
        />
        {debouncedSearchQuery ? (
          searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((product) => (
                <Link
                  to={`/products/${product.id}`}
                  key={product.id}
                  className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg cursor-pointer"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-64 object-contain hover:object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-2xl font-semibold mb-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-700 mb-2">
                      {product.description || "No description available"}
                    </p>
                    <p className="text-lg font-bold text-blue-600 mb-2">
                      ${product.price}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      Brand:{" "}
                      <span className="font-semibold">
                        {product.brand || "Unknown"}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      Category:{" "}
                      <span className="font-semibold">
                        {product.category || "Unknown"}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      Rating:{" "}
                      <span className="font-semibold">
                        {product.rating} / 5
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      Stock:{" "}
                      <span className="font-semibold">
                        {product.stock || "N/A"}
                      </span>
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-blue-600 font-semibold">
                        {product.discountPercentage}% off
                      </span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">No products found</div>
          )
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">
                No products available
              </div>
            ) : (
              products.map((product) => (
                <Link
                  to={`/products/${product.id}`}
                  key={product.id}
                  className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg cursor-pointer"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-64 object-contain hover:object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-2xl font-semibold mb-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-700 mb-2">
                      {product.description || "No description available"}
                    </p>
                    <p className="text-lg font-bold text-blue-600 mb-2">
                      ${product.price}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      Brand:{" "}
                      <span className="font-semibold">
                        {product.brand || "Unknown"}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      Category:{" "}
                      <span className="font-semibold">
                        {product.category || "Unknown"}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      Rating:{" "}
                      <span className="font-semibold">
                        {product.rating} / 5
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      Stock:{" "}
                      <span className="font-semibold">
                        {product.stock || "N/A"}
                      </span>
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-blue-600 font-semibold">
                        {product.discountPercentage}% off
                      </span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}

        {!debouncedSearchQuery && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 border rounded-lg mr-2 ${
                currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
              }`}
            >
              Previous
            </button>
            <span className="px-4 py-2 border rounded-lg bg-gray-100">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border rounded-lg ml-2 ${
                currentPage === totalPages
                  ? "bg-gray-300"
                  : "bg-blue-500 text-white"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;

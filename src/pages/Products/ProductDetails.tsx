import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../Types/Types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useCartDispatch } from "../../Hooks/useCartDispatch";
import { getProductDetails } from "../../API/API";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useCartDispatch();

  const handleAddToCart = () => {
    if (product) {
      dispatch({ type: "ADD_TO_CART", product: { ...product, quantity: 1 } });
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    getProductDetails(id!)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load product details. Please try again later.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-10/12">
          <Skeleton height={256} />
          <Skeleton height={40} width="80%" />
          <Skeleton height={24} count={3} />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-6 text-red-500">{error}</div>;
  }

  if (!product) {
    return (
      <div className="text-center py-6 text-gray-500">No product found</div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="p-4 w-full max-w-3xl">
        <div className="bg-white border rounded-lg shadow-md overflow-hidden">
          {/* Swiper Carousel for images */}
          <Swiper
            modules={[EffectFade, Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            className="mb-6"
          >
            {product.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`${product.title} ${index}`}
                  className="h-64 object-contain w-full"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Product details */}
          <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-lg text-gray-700 mb-4">{product.description}</p>
            <p className="text-2xl text-blue-600 font-bold mb-4">
              ${product.price}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-2">
                  <strong>Brand:</strong> {product.brand}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <strong>Category:</strong> {product.category}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <strong>Stock:</strong> {product.stock} available
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <strong>Rating:</strong> {product.rating} / 5
                </div>
              </div>

              <div>
                <button
                  onClick={handleAddToCart}
                  className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mt-4"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Customer Reviews */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">
                        {review.reviewerName}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{review.comment}</p>
                    <p className="text-yellow-500">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </p>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

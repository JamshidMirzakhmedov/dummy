import { useCartState } from "../Context/useCartState";
import { useCartDispatch } from "../Hooks/useCartDispatch";

const CartModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) => {
  const cartItems = useCartState();
  const dispatch = useCartDispatch();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleRemoveItem = (id: number) => {
    dispatch({ type: "REMOVE_FROM_CART", id });
  };

  const handleIncreaseQuantity = (id: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      dispatch({ type: "ADD_TO_CART", product: item });
    }
  };

  const handleDecreaseQuantity = (id: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      dispatch({ type: "ADD_TO_CART", product: { ...item, quantity: -1 } });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] min-w-[40vw]  overflow-y-auto shadow-lg relative animate-fadeIn">
        <h1 className="text-2xl font-bold mb-6 text-center">Your Cart</h1>
        {cartItems.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            Your cart is empty
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-gray-100 p-4 border border-gray-300 rounded-lg shadow-sm"
              >
                <div className="flex items-center">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="h-20 w-20 object-cover mr-4 rounded"
                  />
                  <div>
                    <h2 className="font-semibold text-lg">{item.title}</h2>
                    <p className="text-sm text-gray-700">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center mt-2 space-x-2">
                      <button
                        onClick={() => handleDecreaseQuantity(item.id)}
                        className="bg-gray-300 p-1 rounded hover:bg-gray-400 transition-colors"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleIncreaseQuantity(item.id)}
                        className="bg-gray-300 p-1 rounded hover:bg-gray-400 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-600 hover:text-red-800 mt-2 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-between items-center border-t border-gray-300 pt-4">
          <h2 className="text-xl font-semibold">Total:</h2>
          <p className="text-xl font-bold text-gray-900">
            ${totalPrice.toFixed(2)}
          </p>
        </div>

        <button
          onClick={closeModal}
          className="absolute top-4 right-4 bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition-colors"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default CartModal;

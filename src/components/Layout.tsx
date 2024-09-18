import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import CartModal from "./Cart";
import { useCartState } from "../Context/useCartState";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user } = useAuth();
  const cart = useCartState();

  // Modal state for the cart
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCartModal = () => setIsCartOpen(!isCartOpen);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <Link to="/">Dashboard</Link>
          </h1>
          <nav className="flex items-center">
            {user && (
              <Link to="/profile" className="mr-4">
                Profile
              </Link>
            )}
            <Link to="/products" className="mr-4">
              Products
            </Link>
            <Link to="/users" className="mr-4">
              Users
            </Link>
            <Link to="/posts" className="mr-4">
              Posts
            </Link>
            <Link to="/todos" className="mr-4">
              Todos
            </Link>

            {/* Cart Button */}
            {cart.length > 0 && (
              <button
                onClick={toggleCartModal}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Cart ({totalItems})
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </footer>

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} closeModal={toggleCartModal} />
    </div>
  );
};

export default Layout;

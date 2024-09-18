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

  const [isCartOpen, setIsCartOpen] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleCartModal = () => setIsCartOpen(!isCartOpen);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <Link to="/">Dashboard</Link>
          </h1>

          {/* Hamburger menu button */}
          <button
            onClick={toggleMenu}
            className="sm:hidden text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>

          {/* Desktop Menu */}
          <nav className="hidden sm:flex items-center">
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="sm:hidden mt-4">
            {user && (
              <Link
                to="/profile"
                className="block px-2 py-1 text-white hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            )}
            <Link
              to="/products"
              className="block px-2 py-1 text-white hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/users"
              className="block px-2 py-1 text-white hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Users
            </Link>
            <Link
              to="/posts"
              className="block px-2 py-1 text-white hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Posts
            </Link>
            <Link
              to="/todos"
              className="block px-2 py-1 text-white hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Todos
            </Link>

            {/* Cart Button */}
            {cart.length > 0 && (
              <button
                onClick={() => {
                  toggleCartModal();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600"
              >
                Cart ({totalItems})
              </button>
            )}
          </nav>
        )}
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

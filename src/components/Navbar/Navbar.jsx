// src/components/Navbar/Navbar.jsx
import React, { useEffect, useRef, useState } from "react";
import Logo from "../../assets/logo.png";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useCart } from "../../context/CartContext";
import DarkMode from "./DarkMode";

const mainMenu = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Top Rated", link: "/#services" },
  { id: 3, name: "Kids Wear", link: "/#" },
  { id: 4, name: "About", link: "/#" },
];

const trendingLinks = [
  { id: 1, name: "Trending Products", link: "#" },
  { id: 2, name: "Best Selling", link: "#" },
  { id: 3, name: "Top Rated", link: "#" },
];

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showTrendingMenu, setShowTrendingMenu] = useState(false);
  const accountRef = useRef(null);
  const trendingRef = useRef(null);
  const navigate = useNavigate();

  const { cartItems = [] } = useCart(); // ✅ Default to empty array

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setShowAccountMenu(false);
      }
      if (trendingRef.current && !trendingRef.current.contains(e.target)) {
        setShowTrendingMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <nav className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 z-50 relative">
      <div className="bg-primary/40 py-3">
        <div className="container mx-auto flex justify-between items-center px-4">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            <img src={Logo} alt="E-Shopy" className="w-10" />
            <span className="hidden sm:block">E-Shopy</span>
          </Link>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden sm:block group">
              <input
                type="text"
                placeholder="Search"
                className="w-[200px] group-hover:w-[280px] transition-all duration-300 rounded-full border px-3 py-1 focus:outline-none border-gray-300 dark:border-gray-600 dark:bg-gray-800"
              />
              <IoMdSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-primary" />
            </div>

            {/* Cart */}
            <button
              onClick={handleCartClick}
              className="relative bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full flex items-center gap-2 transition hover:scale-105"
            >
              <span className="hidden sm:block">Go to Cart</span>
              <FaCartShopping className="text-xl" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Auth */}
            {user ? (
              <div className="relative" ref={accountRef}>
                <button
                  onClick={() => setShowAccountMenu(!showAccountMenu)}
                  className="flex items-center gap-2 px-4 py-1 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition"
                >
                  Account <FaCaretDown />
                </button>
                {showAccountMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-md shadow-lg z-50">
                    <ul className="text-sm">
                      <li className="px-4 py-2 truncate text-xs text-gray-500 dark:text-gray-300">
                        {user?.email}
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer">
                        My Orders
                      </li>
                      <li
                        onClick={handleLogout}
                        className="px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 cursor-pointer"
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="px-4 py-1 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-1 bg-primary text-white rounded-full hover:bg-primary/80 transition"
                >
                  Signup
                </Link>
              </div>
            )}

            <DarkMode />
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex justify-center py-2">
        <ul className="hidden sm:flex items-center gap-6">
          {mainMenu.map((item) => (
            <li key={item.id}>
              <a href={item.link} className="hover:text-primary transition px-2">
                {item.name}
              </a>
            </li>
          ))}
          <li className="relative" ref={trendingRef}>
            <button
              onClick={() => setShowTrendingMenu(!showTrendingMenu)}
              className="flex items-center gap-1 hover:text-primary transition"
            >
              Trending <FaCaretDown className="mt-1" />
            </button>
            {showTrendingMenu && (
              <div className="absolute top-7 left-0 bg-white dark:bg-gray-800 shadow-md rounded-md w-44 p-2 z-50">
                {trendingLinks.map((item) => (
                  <a
                    key={item.id}
                    href={item.link}
                    className="block px-4 py-2 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-md"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Products from './components/Products/Products';
import TopProducts from './components/TopProducts/TopProducts';
import Footer from './components/Footer/Footer';

import CartPage from './pages/CartPage'; // ✅ Ensure this file has a default export
import Login from './pages/Login';
import Signup from './pages/Signup';

import AOS from 'aos';
import 'aos/dist/aos.css';

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />

      {!isAuthPage && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Products />
              <TopProducts />
            </>
          }
        />
        <Route path="/cart" element={<CartPage />} /> {/* ✅ Cart Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      {!isAuthPage && <Footer />}
    </div>
  );
};

const App = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: 'ease-in-sine',
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return <AppContent />;
};

export default App;

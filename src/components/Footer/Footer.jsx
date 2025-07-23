import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { IoLocationSharp } from "react-icons/io5";
import Logo from "../../assets/logo.png";
import Skyline from "../../assets/footer-pattern.jpg";

const Footer = () => {
  return (
<footer className="relative bg-black text-white mt-12 pt-12 pb-24">
      {/* Content Grid */}
      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 z-10 relative">
        {/* Brand & Description */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src={Logo} alt="logo" className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Shopy</h1>
          </div>
          <p className="text-sm text-gray-300">
            Your one-stop destination for quality products and seamless shopping.</p>
        </div>


        {/* Contact & Socials */}
        <div className="space-y-4">
          <div className="flex gap-3 text-xl">
            <FaInstagram />
            <FaFacebookF />
            <FaLinkedinIn />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <IoLocationSharp className="text-lg" />
            Manglore, Karnataka
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <FiPhone className="text-lg" />
            +91 9876543210
          </div>
        </div>
      </div>

      {/* Skyline Background Image at Bottom */}
      <div className="absolute bottom-0 left-0 w-full z-0">
        <img src={Skyline} alt="skyline" className="w-full object-cover h-[60px]" />
      </div>
    </footer>
  );
};

export default Footer;
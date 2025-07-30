import React from "react";
import { FaStar } from "react-icons/fa6";

import Img1 from "../../assets/bag.jpg";
import Img2 from "../../assets/watch.jpg";
import Img3 from "../../assets/blazer.jpg";
import Img4 from "../../assets/nike.jpg";
import Img5 from "../../assets/nike2.jpg";
import Img6 from "../../assets/set.jpg";
import Img7 from "../../assets/bleu.jpg";
import Img8 from "../../assets/miss dior.jpg";
import Img9 from "../../assets/bottle.jpg";
import Img10 from "../../assets/hair mask.jpg";
import Img11 from "../../assets/look.jpg";

const products = [
  {
    id: 1,
    img: Img1,
    name: "Pink Leather Handbag",
    category: "Bags",
    price: "₹2999",
    rating: 4.6,
    aosDelay: "0",
  },
  {
    id: 2,
    img: Img2,
    name: "Luxury Women's Watch",
    category: "Accessories",
    price: "₹4999",
    rating: 4.8,
    aosDelay: "100",
  },
  {
    id: 3,
    img: Img3,
    name: "Women's Fashion Blazer",
    category: "Clothing",
    price: "₹1999",
    rating: 4.4,
    aosDelay: "200",
  },
  {
    id: 4,
    img: Img4,
    name: "Nike Air Black Sneakers",
    category: "Footwear",
    price: "₹3999",
    rating: 4.7,
    aosDelay: "300",
  },
  {
    id: 5,
    img: Img5,
    name: "Nike Lime Green Sneakers",
    category: "Footwear",
    price: "₹4299",
    rating: 4.5,
    aosDelay: "400",
  },
  {
    id: 6,
    img: Img6,
    name: "The Ordinary Skincare Set",
    category: "Skincare",
    price: "₹2499",
    rating: 4.9,
    aosDelay: "0",
  },
  {
    id: 7,
    img: Img7,
    name: "Bleu de Chanel",
    category: "Fragrance",
    price: "₹5999",
    rating: 5.0,
    aosDelay: "100",
  },
  {
    id: 8,
    img: Img8,
    name: "Miss Dior Eau de Toilette",
    category: "Fragrance",
    price: "₹5499",
    rating: 4.8,
    aosDelay: "200",
  },
  {
    id: 9,
    img: Img9,
    name: "Amber Dropper Bottle",
    category: "Beauty Tools",
    price: "₹999",
    rating: 4.4,
    aosDelay: "300",
  },
  {
    id: 10,
    img: Img10,
    name: "Act+Acre Restorative Hair Mask",
    category: "Haircare",
    price: "₹1299",
    rating: 4.6,
    aosDelay: "400",
  },
  {
    id: 11,
    img: Img11,
    name: "Winter Shopping Look",
    category: "Fashion",
    price: "₹2999",
    rating: 4.9,
    aosDelay: "500",
  }
];

const Products = () => {
  const handleAddToCart = (productName) => {
    alert(`${productName} added to cart!`);
  };

  return (
    <div className="mt-14 mb-12">
      <div className="container">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-primary">
            Top Selling Products for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Top Selling Products
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Explore our most popular picks, handpicked by shoppers like you for unbeatable style and value.
          </p>
        </div>

        {/* Product grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 
                     lg:grid-cols-5 place-items-center gap-5"
        >
          {products.map((product) => (
            <div
              data-aos="fade-up"
              data-aos-delay={product.aosDelay}
              key={product.id}
              className="space-y-3 shadow p-3 rounded-md hover:scale-105 transition-transform w-full max-w-[180px]"
            >
              <img
                src={product.img}
                alt={product.name}
                className="h-[220px] w-full object-cover rounded-md"
              />
              <div>
                <h3 className="font-semibold text-sm">{product.name}</h3>
                <p className="text-xs text-gray-600">{product.category}</p>
                <div className="flex items-center gap-1 text-sm">
                  <FaStar className="text-yellow-400" />
                  <span className="text-gray-600">{product.rating}</span>
                </div>
                <p className="text-green-600 text-sm font-semibold">{product.price}</p>
              </div>
              <button
                onClick={() => handleAddToCart(product.name)}
                className="w-full bg-primary text-white text-xs py-1.5 rounded-md hover:bg-black transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;

import React from "react";
import Img1 from "../../assets/women.png";
import Img2 from "../../assets/women2.jpg";
import Img3 from "../../assets/women3.jpg";
import Img4 from "../../assets/women4.jpg";
import Img5 from "../../assets/dress.jpeg"
import {FaStar} from "react-icons/fa6";

const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "Trendy Polarized Goggles",
    rating: 4.7,
    color: "brown",
    author: "brown",
    price: "$29.99",
    aosDelay: "400",
  },
  {
    id: 2,
    img: Img1,
    title: "Women’s Ethnic Wear",
    rating: 5.0,
    color: "white",
    author: "white",
    price: "$45.00",
    aosDelay: "0",
  },
  {
    id: 3,
    img: Img2,
    title: "Oversized Retro Goggles",
    rating: 4.5,
    color: "black",
    author: "Red",
    price: "$35.99",
    aosDelay: "200",
  },
  {
    id: 4,
    img: Img3,
    title: "Goggles",
    rating: 4.7,
    color: "brown",
    author: "brown",
    price: "$25.00",
    aosDelay: "400",
  },
  {
    id: 5,
    img: Img5,
    title: "Oversized Retro Goggles",
    rating: 4.5,
    color: "black",
    author: "Red",
    price: "$38.75",
    aosDelay: "200",
  },
];


const Products = () => {
  return (
    <div className="mt-14 mb-12">
      <div className="container">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p                 data-aos="fade-up"
 className="text-sm text-primary">
            Top Selling Products for you
          </p>
          <h1 data-aos="fade-up"
className="text-3xl font-bold">Top Selling Products</h1>
          <p                 data-aos="fade-up"
 className="text-xs text-gray-400">
           Explore our most popular picks, handpicked by shoppers like you for unbeatable style and value.
          </p>
        </div>

         {/* Body section */}
         <div></div>
        <div
          className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 
                     lg:grid-cols-5 place-items-center gap-5"
        >
          {/* Card section */}
          {ProductsData.map((data) => (
            <div
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                key={data.id}
                className="space-y-3"
            
            
            >
                <img src={data.img} alt="" 
                className=" h-[220px] w-[150px]
                object-cover rounded-md" />

                <div>
                    <h3 className="font-semibold">{data.title}</h3>

                    <p className="text-sm text-gray-600">{data.color}</p>
                    <div>
                        <FaStar className="text-yellow-400"/>
                        <span className="text-sm text-gray-600 ml-1">
{data.rating}</span>
<p className="text-green-600 text-sm font-semibold">{data.price}</p>

                        </div>
                </div>
                </div>
              
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
import React from "react";
import Img1 from "../../assets/shirt.png";
import Img2 from "../../assets/shirt2.png";
import Img3 from "../../assets/shirt3.png";
import Img4 from "../../assets/denim.jpeg";
import { FaStar } from "react-icons/fa";
import Img5 from "../../assets/hoodie.jpeg";
import Img6 from "../../assets/flannel.jpeg";
import Img7 from "../../assets/linen-shirt.jpeg";
import Img8 from "../../assets/leather-jacket.jpeg";



const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "Casual Comfort Shirt",
    description:
      "Relax in style with our breathable casual shirt, crafted from soft fabric for daily comfort and a smart look.",
    price: "$24.99",
  },
  {
    id: 2,
    img: Img2,
    title: "Bold Striped Shirt",
    description:
      "Make a statement with this trendy striped shirt — perfect for casual days, brunches, or summer vibes.",
    price: "$27.49",
  },
  {
    id: 3,
    img: Img3,
    title: "Chic Tie-Front Shirt",
    description:
      "Classic denim jacket with modern fit. Durable, lightweight, and perfect for all seasons.",
    price: "$35.00",
  },
  {
    id: 4,
    img: Img4,
    title: "Denim Jacket",
    description:
      "A classic denim jacket with a twist! Featuring a tie-front design and soft texture for day-to-night style.",
    price: "$42.00",
  },
  {
  id: 5,
  img: Img5,
  title: "Cozy Streetwear Hoodie",
  description:
    "Keep warm and trendy with this soft, oversized hoodie – ideal for streetwear lovers and cozy evenings.",
  price: "$39.99",
},
{
  id: 6,
  img: Img6,
  title: "Vintage Flannel Shirt",
  description:
    "A must-have for layering—our flannel shirt combines warmth and retro vibes in a soft brushed cotton fabric.",
  price: "$29.50",
},
{
  id: 7,
  img: Img7,
  title: "Linen Summer Shirt",
  description:
    "Lightweight and breathable, this linen shirt is designed for summer days and tropical escapes.",
  price: "$33.25",
},
{
  id: 8,
  img: Img8,
  title: "Classic Leather Jacket",
  description:
    "Bold, timeless, and edgy—our leather jacket adds instant style to any outfit. A true wardrobe essential.",
  price: "$59.99",
}

  
];


const TopProducts = () => {
  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="text-left mb-24">
          <p data-aos="fade-up" className="text-sm text-primary">
            Top Rated Products for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Top Rated Products
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Discover the best-selling items loved by our customers—trusted quality, top-rated style.


          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 place-items-center">
          {ProductsData.map((data) => (
            <div
              key={data.id}
              className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 group max-w-[300px]"
            >
              {/* Background & Image Wrapper */}
              <div className="relative h-[200px] flex items-center justify-center">
                <img
                  src={data.img}
                  alt=""
  className="w-[140px] mx-auto drop-shadow-lg"
                />
              </div>

              {/* Product details */}
              <div className="p-4 text-center">
                <div className="w-full flex items-center justify-center gap-1 mb-2">
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                </div>
                <h1 className="text-xl font-bold">{data.title}</h1>
                <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">{data.description}</p>
                <p className="text-green-600 font-semibold text-sm mt-2 group-hover:text-white duration-300">
  {data.price}
</p>

                <button className="bg-primary hover:scale-105
                duration-300 text-white py-1 px-4
                rounded-full mt-4 group-hover:bg-white
                group-hover:text-primary" 
                //onClick={handleOrderPopup} 
                >Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;

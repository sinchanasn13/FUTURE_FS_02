import React from "react";
import Image1 from "../../assets/women.png";
import Image2 from "../../assets/shopping.png";
import Image3 from "../../assets/sale.png";
import Slider from "react-slick";

const ImageList = [
  {
    id: 1,
    img: Image1,
    title: "Shop Smart, Shop Online",
    description: "Trendy fashion, fast delivery. All from your phone.",
  },
  {
    id: 1,
    img: Image2,
     title: "Shop Together, Save More",
    description: "Enjoy exclusive couple discounts on your favorite brands.",
  
  },
  {
    id: 1,
    img: Image3,
   title: "Super Offer – Big Sale!",
    description: "Get up to 70% off. Only this week – don't miss it!",
  },
];

const Hero = () => {
    var settings = {
        dots:false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase:"ease-in-out",
        pauseOnHover: false,
        pauseOnFocus: true,
    };


  return (
    <div
      className="
        relative overflow-hidden 
        min-h-[550px] sm:min-h-[650px] 
        bg-gray-100 dark:bg-gray-950 
        flex justify-center items-center 
        dark:text-white duration-200
      "
    >
      <div
        className="
          h-[700px] w-[700px] 
          bg-primary/40 
          absolute -top-1/2 right-0 
          rounded-3xl rotate-45 -z-9
        "
      ></div>

      <div className="container pb-8 sm:pb-0">


        <Slider {...settings}>
                {ImageList.map((data) => (
                     <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 ">
            <div
                className="flex flex-col justify-center gap-4
                pt-12 sm:pt-0 text-center sm:text-left
                order-2 sm:order-1 relative z-10"

            
            
            >
              <h1
              
                data-aos="zoom-out"
                data-aos-duration="500"
                data-aos-once="true"
               className="text-5xl sm:text-6xl lg:text-7xl font-bold">
{data.title}              </h1>
              <p  
                data-aos="zoom-out"
                data-aos-duration="500"
                data-aos-delay="100"
                                data-aos-once="true"
                className="text-sm">
{data.description}              </p>
              <div
              
              
                data-aos="zoom-out"
                data-aos-duration="500"
                data-aos-delay="300">
                
              </div>
            </div>
            <div className="order-1 sm:order-2">
                <div
                data-aos="zoom-out"
                data-aos-duration="500"
                data-aos-once="true"

                className="relative z-10">
                    <img src={data.img} alt=""
                    className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-105 
                    lg:scale-120
                    object-contain mx-auto"

                    />
                </div>
            </div>

          
          </div>
        </div>


                   )) }
            
        </Slider>


      </div>
    </div>
  );
};

export default Hero;

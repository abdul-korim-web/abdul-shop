import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardFooter, Image, Button } from "@heroui/react";
import useCart from "../../function/cartProductAdd";

const HomeProductCart = ({ homeProduct }) => {
  const navigate = useNavigate();
  const { addCartProduct } = useCart();

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 800, // 
    autoplaySpeed: 2500,
    cssEase: "ease-in-out",
    swipeToSlide: true,
    touchThreshold: 10,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          arrows: false,
          centerMode: false,
        },
      },
    ],
  };

  if (!homeProduct || homeProduct.length === 0) {
    return <p className="text-gray-500 text-center">No product found</p>;
  }

  return (
    <div className="slider-container px-2 md:px-5">
      <Slider {...settings}>
        {homeProduct.map((product) => (
          <div key={product._id} className="px-2 flex-shrink-0">
           <Card className="w-full max-w-full h-[260px] md:h-[320px] shadow-xl  flex-shrink-0">

              <CardHeader className="z-10 flex-col items-start p-2 md:p-4">
                <p
                  className={`text-[10px] md:text-xs uppercase font-bold ${
                    product.isAvailable
                      ? "text-blue-500"
                      : "text-red-500"
                  }`}
                >
                  {product.isAvailable ? "Available" : "Out of stock"}
                </p>

                <h4 className="text-black font-medium text-sm md:text-lg truncate w-full">
                  {product.productName}
                </h4>
              </CardHeader>

              <Image
                removeWrapper
                alt={product.productName}
                className="w-full h-full object-cover"
                src={product.images?.[0]}
              />

              <CardFooter className="absolute bg-white/90 bottom-0 z-10 flex flex-col gap-2 p-2 md:p-3">

                <div className="w-full">
                  <p className="text-[11px] md:text-sm">
                    Brand: {product.brand}
                  </p>

                  <div className="flex gap-2 items-center">
                    <p className="text-base md:text-lg font-semibold">
                      ৳ {product.price - product.discount}
                    </p>
                    <p className="text-xs line-through">
                      ৳ {product.price}
                    </p>
                  </div>
                </div>

             
                <div className="w-full flex gap-2">
                  <Button
                    size="sm"
                    className="w-1/2 text-xs md:text-sm bg-blue-500 text-white"
                    onClick={() =>
                      navigate(`product/${product._id}`)
                    }
                  >
                    View
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => addCartProduct(product)}
                    className={`w-1/2 text-xs md:text-sm ${
                      product?.isAvailable
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                    disabled={!product.isAvailable}
                  >
                    Add
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeProductCart;
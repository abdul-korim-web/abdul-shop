import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardFooter, Image, Button } from "@heroui/react";
import useCart from "../../function/cartProductAdd";

const HomeProductCart = ({ homeProduct }) => {
  const navigate = useNavigate();
  // add user cart in product
  const {addCartProduct} = useCart()

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  if (!homeProduct || homeProduct.length === 0) {
    return <p className="text-gray-500 text-center">No product found</p>;
  }

  return (
    <div className="slider-container px-5">
      <Slider {...settings}>
        {homeProduct.map((product) => (
          <div key={product._id} className="px-2">
            <Card isFooterBlurred className="w-full h-[320px] shadow-2xl">
              <CardHeader className="z-10 top-1 flex-col items-start">
                <p
                  className={`text-tiny uppercase font-bold ${
                    product.isAvailable ? "text-blue-500" : "text-red-500"
                  }`}
                >
                  {product.isAvailable ? "Available" : "Out of stock"}
                </p>
                <h4 className="text-black font-medium text-xl">
                  {product.productName}
                </h4>
              </CardHeader>

              <Image
                removeWrapper
                alt={product.productName}
                className="z-0 w-full h-full object-cover"
                src={product.images?.[0]}
              />

              <CardFooter className="absolute bg-white/80 bottom-0 z-10 flex flex-col gap-2">
                <div className="w-full flex justify-between items-center">
                  <div>
                    <p className="text-black text-sm">
                      Brand: {product.brand}
                    </p>
                    <div className="flex space-x-2 items-center">
                      <p className="text-black text-xl">
                        ৳ {product.price - product.discount}
                      </p>
                      <p className="text-black text-sm line-through">
                        ৳ {product.price}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full flex gap-2">
                  <Button
                    color="primary"
                    size="sm"
                    className="w-1/2"
                    onClick={()=>navigate(`product/${product._id}`)}

                  >
                    View
                  </Button>

                  <Button
                    color="success"
                    size="sm"
                    onClick={()=>addCartProduct(product)}
                    className={`w-1/2 ${
                      product?.isAvailable
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                    disabled={!product.isAvailable}
                  >
                    Add to Cart
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

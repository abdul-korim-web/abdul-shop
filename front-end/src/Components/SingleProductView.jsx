import { Button } from "@heroui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { product_url } from "../Config/SarverURL";

const SingleProductView = () => {
    const [product,setProduct] = useState({})
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const settings = {
    customPaging: function (i) {
      return (
        <div className=" ">
          <img
            src={product?.images?.[i]}
            alt={product?.productName}
            className=""
          />
        </div>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
//    get nsingle product on database 
const {productId} = useParams()
  const getSingleProduct = async()=>{
    try {
        setLoading(true)
        const res = await axios.get(`${product_url}/${productId}`,{withCredentials:true})
    
        if (res?.data?.success) {
            setProduct(res?.data?.product)
            
        } else {
            console.log(res?.data?.message);
            
        }
    } catch (error) {
        console.log(error?.response?.data?.message);
    } finally{
        setLoading(false)
    }
  }
  useEffect(()=>{
    getSingleProduct()
  },[])
  return (
    <div className="p-5  ">
      <div>
        <Button onClick={() => navigate(window.history.go(-1))}>
          <IoMdArrowRoundBack size={20} />
        </Button>
      </div>
      <div className="mt-10 flex  space-x-2 md:px-20 ">
        <h2 className=" text-[15px] md:text-2xl font-semibold">
          {product?.productName}
        </h2>
        <h2>
          {product?.isAvailable ? (
            <>
              <span className="text-sm bg-blue-500  text-white px-3 py-1 rounded-2xl italic">
                IN STOCK
              </span>
            </>
          ) : (
            <>
              <span className="text-sm bg-red-600  text-white px-3 py-1 rounded-2xl italic">
                OUT OF STOCK
              </span>
            </>
          )}
        </h2>
      </div>
      <div className="md:px-30 grid md:grid-cols-12 grid-cols-1 justify-between items-center">
        <div className="slider-container w-[200px] h-[200px]  md:w-[400px] md:h-[350px] col-span-1 mt-20 md:col-span-6 mx-auto">
          <Slider {...settings} className="">
            {product?.images?.map((item, index) => (
              <div key={index} className="">
                <img
                  src={item}
                  alt={product?.productName}
                  className=" w-[200px] h-[200px]  md:w-[400px] md:h-[350px] object-cover rounded-2xl"
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="mt-10  col-span-12 md:col-span-6">
          <div>
            <h2 className="text-2xl font-semibold ">{product?.productName}</h2>
          </div>
          <div className="flex  flex-wrap space-y-2 space-x-2 items-center mt-3 md:mt-5 text-sm">
            <p className=" px-2 py-1 bg-gray-200 rounded-2xl  ">
              price:{" "}
              <span className="font-semibold">
                {product?.price - product?.discount}
              </span>
            </p>
            <p className=" px-2 py-1 bg-gray-200 rounded-2xl  ">
              Regular Price :{" "}
              <span className="font-semibold">{product?.price}</span>
            </p>
            <p className=" px-2 py-1 bg-gray-200 rounded-2xl  ">
              Status:
              {product?.isAvailable ? (
                <>
                  <span className="  text-blue-500 px-3 py-1 ">in stock</span>
                </>
              ) : (
                <>
                  <span className=" text-red-500 px-3 py-1 ">out of stock</span>
                </>
              )}
            </p>
            <p className=" px-2 py-1 bg-gray-200 rounded-2xl mb-2  ">
              Brand: <span className="font-semibold">{product?.brand}</span>
            </p>
          </div>
          <div className="flex flex-wrap flex-col  space-y-2 font-semibold  mt-5 md:text-xl">
            <div>
              <h2 className="text-red-500 underline "> More Info</h2>
            </div>
           
            <div>
              <h2>Category : {product?.category || "unknown"}</h2>
            </div>
            <div>
              <h2>Discount : {product?.discount || 0}</h2>
            </div>
            
            
            <div className="flex flex-wrap space-y-2 space-x-5 items-center mt-5">
      <Button
        isDisabled={!product?.isAvailable}
        className={`
          ${product?.isAvailable ? 'cursor-pointer' : 'cursor-not-allowed'}
          ${product?.isAvailable ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-400 text-gray-700'}
        `}
        color={product?.isAvailable ? 'primary' : 'default'} // Pass color prop if needed by your Button component
      >
        Buy Now
      </Button>
      <Button
        isDisabled={!product?.isAvailable}
        className={`
          ${product?.isAvailable ? 'cursor-pointer' : 'cursor-not-allowed'}
          ${product?.isAvailable ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-400 text-gray-700'}
        `}
        color={product?.isAvailable ? 'primary' : 'default'} // Pass color prop if needed by your Button component
      >
       Add To Cart 
      </Button>
      
    </div>
          </div>
        </div>
      </div>
      <div className="md:mt-20">
        <h2 className="text-2xl mb-5">Product Description :</h2>
        <p className="w-[90%] md:px-10">{product?.description}</p>
      </div>
    </div>
  );
};

export default SingleProductView;

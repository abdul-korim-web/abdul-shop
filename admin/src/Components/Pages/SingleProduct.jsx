import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { product_api_url } from "../../config";
import { AuthContext } from "../Auth/AuthContext";
import { toast } from "react-toastify";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Button, useDisclosure } from "@heroui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdDelete } from "react-icons/md";
import { RiExchangeLine } from "react-icons/ri";
import SingleProductDeleteModal from "./Modal/SingleProductDeleteModal;";

const SingleProduct = () => {
  const { adminId, productId } = useParams();
  const { token } = useContext(AuthContext);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const getSingleProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${product_api_url}/singleProduct/${adminId}/${productId}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setProduct(res?.data?.product);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);
   // product delete section
  const {isOpen,onOpen, onOpenChange} = useDisclosure();
  // delete button 
  const handelProductDElete = ()=>{
    onOpen()
  }
  if (loading) {
    return <h2>Loading......</h2>;
  }
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
 
  return (
    <div className="p-5">
      <div>
        <Button onClick={() => navigate(window.history.go(-1))}>
          <IoMdArrowRoundBack size={20} />
        </Button>
      </div>
      <div className="mt-5 flex  space-x-2 ">
        <h2 className=" text-[15px] md:text-2xl font-semibold">{product?.productName}</h2>
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
      {/* images  */}
      <div className="grid md:grid-cols-12 grid-cols-1  justify-around items-center">
        <div className="slider-container w-[200px] h-[200px]  md:w-[400px] md:h-[350px] mt-20 md:col-span-4">
          <Slider {...settings} className="">
            {product?.images?.map((item, index) => (
              <div key={index} className=" ">
                <img
                  src={item}
                  alt={product?.productName}
                  className=" w-[200px] h-[200px]  md:w-[400px] md:h-[350px] object-cover rounded-2xl"
                />
              </div>
            ))}
          </Slider>
        </div>
        {/* info  */}
        <div className="mt-10  col-span-12 md:col-span-8">
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
          {/* more info  */}
          <div>
            <h2 className="text-red-500 underline "> More Info</h2>

          </div>
          <div >
              <h2>Author : {product?.createBY?.username || "unknown"}</h2>
          </div>
          <div>
              <h2>Category : {product?.category || "unknown" }</h2>
          </div>
          <div>
              <h2>Discount : {product?.discount || 0}</h2>
          </div>
          <div>
            <h2>Product create: <span>{new Date(product?.createdAt).toLocaleDateString("en-BD")}</span></h2>
          </div>
          <div>
            <h2>Last Product update: <span>{new Date(product?.createdAt).toLocaleDateString("en-BD")}</span></h2>
          </div>
          <div className="flex flex-wrap space-y-2 space-x-5 items-center mt-5 ">
            <Button onClick={handelProductDElete} className="bg-red-500 text-white"><span>{<MdDelete/>}</span >delete Product</Button>
            <Button color="primary" className=" text-white mb-2"><span>{<RiExchangeLine/>}</span>Update Product</Button>
          </div>
        </div>
        </div>
        
      </div>
       <div className="md:mt-20">
        <h2 className="text-2xl mb-5">Product Description :</h2>
        <p className=" md:px-10">{product?.description}</p>
      </div>
      <SingleProductDeleteModal isOpen={isOpen} onOpenChange={onOpenChange} product={product}/>
    </div>
  );
};

export default SingleProduct;

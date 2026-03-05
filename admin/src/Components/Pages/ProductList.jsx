import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { product_api_url } from "../../config";
import { AuthContext } from "./../Auth/AuthContext";
import { toast } from "react-toastify";
import { ScaleLoader } from "react-spinners";
import { Card, CardHeader, CardFooter, Image, Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);

  const getProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${product_api_url}/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res?.data?.success) {
        setAllProduct(res.data.producList || []);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  // navigate single product  page
  const navigate = useNavigate();
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ScaleLoader color="green" />
      </div>
    );
  }
  // no product found
  if (allProduct.length===0) {
    return (
      <div className="flex justify-center mt-10 md:mt-20 font-semibold  text-2xl items-center">
        <p>No Product Found </p>
      </div>
    );
  }
 

  return (
    <div className="px-6">
      {/* User info */}
      {allProduct.length > 0 && (
        <h2 className="text-2xl mb-2">
          MY Unique id:{" "}
          <span className="font-semibold">{allProduct[0]?.createBY?._id}</span>{" "}
          <span className="font-semibold">
            ({allProduct[0]?.createBY?.username})
          </span>
        </h2>
      )}

      <p className="mt-2 text-xl mb-4">My product list:</p>

      {/* Product Grid */}
      <div className="grid grid-cols-12 gap-4">
        {allProduct.length === 0 ? (
          <p className="text-gray-500">No product found</p>
        ) : (
          allProduct.map((product) => (
            <Card
              key={product._id}
              isFooterBlurred
              className="w-[80%] md:w-full  h-[300px] col-span-12 sm:col-span-6 md:col-span-3 shadow-2xl"
            >
              <CardHeader className=" z-10 top-1 flex-col items-start ">
                <p
                  className={`text-tiny uppercase font-bold ${
                    product?.isAvailable ? "text-blue-500" : "text-red-500"
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
                className="z-0 w-full h-full object-cover "
                src={product.images?.[0]}
              />

              <CardFooter className="absolute bg-white/70 bottom-0 z-10 justify-between">
                <div>
                  <p className="text-black text-sm">Brand: {product.brand}</p>
                  <div className="flex space-x-2  items-center">
                    <p className="text-black text-xl ">
                      ৳ {product.price - product?.discount}
                    </p>
                    <p className="text-black text-sm line-through ">
                      ৳ {product.price}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() =>
                    navigate(
                      `/product/${product?.createBY?._id}/${product?._id}`
                    )
                  }
                  color="primary"
                  radius="full"
                  size="sm"
                >
                  View
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;

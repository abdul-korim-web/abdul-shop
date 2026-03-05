import { Button } from "@heroui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { product_url } from "./../../Config/SarverURL";
import useCart from "../function/cartProductAdd";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const { addCartProduct } = useCart();
  const [totalProduct, setTotalProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  // navigate  to order page
  const navigate = useNavigate()

  const getProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${product_url}/usergetallproduct`, {
        withCredentials: true,
      });
      if (res?.data?.success) {
        setTotalProduct(res?.data?.allProduct);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const searchFilterProduct = totalProduct.filter((product) =>
    product?.productName
      ?.toLowerCase()
      .includes(searchValue.trim().toLowerCase())
  );

  return (
    <div className="px-4 md:px-10 py-10 max-w-7xl mx-auto">
      {/* Search */}
      <div className="flex justify-center items-center gap-3 mb-10">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          className="border px-4 py-2 rounded-full w-full max-w-md focus:outline-none"
          placeholder="Search Your Product"
        />
        <Button className="rounded-full w-10 h-10 bg-blue-500 text-white flex items-center justify-center">
          <CiSearch size={20} />
        </Button>
      </div>

      {/* Product List */}
      {!searchFilterProduct.length ? (
        <div className="text-center text-xl font-semibold text-gray-500">
          Product Not Found 😒
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchFilterProduct.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={item?.images?.[0]}
                  alt={item?.productName}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col flex-1">
                <h2 className="font-semibold text-lg mb-2 line-clamp-1">
                  {item?.productName}
                </h2>

                <div className="flex justify-between items-center mb-3">
                  <div className="flex gap-2 items-center">
                    <span className="text-lg font-bold text-blue-600">
                      ৳ {item?.price - item?.discount}
                    </span>
                    <span className="line-through text-sm text-gray-400">
                      ৳ {item?.price}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {item?.brand}
                  </span>
                </div>

                {/* Buttons */}
                <div className="mt-auto flex gap-2">
                  <Button
                  onClick={()=>navigate(`/product/${item?._id}`)}
                
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    View
                  </Button>

                  <Button
                  onClick={()=>addCartProduct(item)}
                    isDisabled={!item?.isAvailable}
                    className={`flex-1 ${
                      item?.isAvailable
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                  >
                    Add To Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;

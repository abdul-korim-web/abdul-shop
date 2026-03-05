import React, { useContext, useState } from "react";
import { FaRegImages } from "react-icons/fa";
import { Button, ButtonGroup } from "@heroui/button";
import axios from "axios";
import { AuthContext } from "./../Auth/AuthContext";
import { product_api_url } from "../../config";
import { toast } from "react-toastify";
import { ClipLoader, RingLoader } from "react-spinners";

const Additem = () => {
  //    token
  const { token } = useContext(AuthContext);
  //  state
  const [fromdata, setFromData] = useState({
    productName: "",
    brand: "",
    price: "",
    discount: 0,
    category: "",
    isAvailable: true,
    description: "",
    images1: null,
    image2: null,
    image3: null,
  });
  const [loading, setLoading] = useState(false);
  //  handelchange
  const handelChange = (e) => {
    const { name, value, type } = e.target;

    if (name === "isAvailable") {
      setFromData({ ...fromdata, isAvailable: value === "true" });
    } else if (type === "number") {
      setFromData({ ...fromdata, [name]: Number(value) });
    } else {
      setFromData({ ...fromdata, [name]: value });
    }
  };

  // handelImageChange
  const handelImageChange = (e) => {
    const { id, files } = e.target;
    setFromData({ ...fromdata, [id]: files[0] });
    console.log(fromdata);
  };
  //   handelSubmit
  const handelSubmit = async () => {
    try {
      setLoading(true);
      // console.log(fromdata);
      const productData = new FormData();
      Object.entries(fromdata).forEach(([key, value]) => {
        productData.append(key, value);
      });
      const res = await axios.post(`${product_api_url}/create`, productData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${token}`,
        },
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setFromData({
          productName: "",
          brand: "",
          price: "",
          discount: 0,
          category: "",
          isAvailable: true,
          description: "",
          images1: null,
          image2: null,
          image3: null,
        });
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-2">
      <form action="" className="flex flex-col gap-2">
        <div>
          <h2 className="text-2xl font-semibold italic">Add Your Product</h2>
        </div>
        {/* image */}
        <div className="">
          <label className="text-gray-500">Add your product image </label>
          <div className="flex  flex-wrap space-x-3">
            {[`image1`, `image2`, `image3`].map((item, index) => (
              <div key={index}>
                <div className="p-4 border w-[100px] flex items-center justify-center mt-2">
                  <label htmlFor={item}>
                    {" "}
                    {fromdata?.[item] ? (
                      <>
                        <div>
                          <img
                            className="object-center w-20 h-10"
                            src={URL.createObjectURL(fromdata[item])}
                            alt=""
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        {" "}
                        <FaRegImages className="text-3xl" />
                      </>
                    )}
                    {fromdata?.[item] ? "change" : "upload"}
                  </label>
                  <input
                    type="file"
                    className="hidden"
                    id={item}
                    accept="image/*"
                    onChange={handelImageChange}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* peoduct name */}
        <div className="flex flex-col space-y-1 ">
          <label htmlFor="" className="text-gray-500">
            {" "}
            Product Name:
          </label>
          <input
            value={fromdata?.productName}
            name="productName"
            onChange={(e) => handelChange(e)}
            placeholder="Enter product name"
            type="text"
            className="border w-[200px] p-1 rounded-sm border-gray-300"
          />
        </div>
        {/* brand and price */}
        <div className="flex flex-wrap gap-2">
          <div className="flex flex-col space-y-1 ">
            <label htmlFor="" className="text-gray-500">
              Brand*
            </label>
            <input
              value={fromdata?.brand}
              name="brand"
              onChange={(e) => handelChange(e)}
              placeholder="Enter Brand Name"
              type="text"
              className="border w-[200px] p-1 rounded-sm border-gray-300"
            />
          </div>
          <div className="flex flex-col space-y-1 ">
            <label htmlFor="" className="text-gray-500">
              price
            </label>
            <input
            value={fromdata?.price}
              name="price"
              onChange={(e) => handelChange(e)}
              placeholder="Enter Price"
              type="number"
              className="border w-[200px] p-1 rounded-sm border-gray-300"
            />
          </div>
        </div>
        {/*  discount parsent */}
        <div className="flex flex-col space-y-1 ">
          <label htmlFor="" className="text-gray-500">
            discount
          </label>
          <input
          value={fromdata?.discount}
            name="discount"
            onChange={(e) => handelChange(e)}
            placeholder="Enter Discount"
            type="number"
            className="border w-[200px] p-1 rounded-sm border-gray-300"
          />
        </div>
        {/* isAvailable and category */}
        <div className="flex flex-wrap gap-2 md:space-x-10">
          <div className="flex flex-col space-y-1 ">
            <label htmlFor="" className="text-gray-500">
              category
            </label>
            <select
            value={fromdata?.category}
              name="category"
              onChange={(e) => handelChange(e)}
              id=""
              className="p-2 border border-gray-200 rounded-xl"
            >
              <option value="select">select</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Home Appliances">Home Appliances</option>
              <option value="Beauty">Beauty</option>
              <option value="Toys">Toys</option>
              <option value="Sports">Sports</option>
              <option value="Groceries">Groceries</option>
              <option value="others">others</option>
            </select>
          </div>
          <div className="flex flex-col space-y-1 ">
            <label htmlFor="" className="text-gray-500">
              isAvailable
            </label>
            <select
            value={fromdata?.isAvailable}
              name="isAvailable"
              onChange={(e) => handelChange(e)}
              id=""
              className="p-2 border border-gray-200 rounded-xl"
            >
              <option value="select">select</option>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </div>
        </div>
        {/* discription  */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="" className="text-gray-500">
            {" "}
            Add Description
          </label>
          <textarea
          value={fromdata?.description}
            name="description"
            onChange={(e) => handelChange(e)}
            id=""
            rows={10}
            cols={10}
            placeholder="Enter Your Product Description..........."
            className="border resize-none w-[90%] md:w-[40%] rounded-xl border-gray-500 p-2"
          ></textarea>
        </div>
        <div className="mt-2">
          <Button
            color="primary"
            onClick={handelSubmit}
            disabled={loading}
            className={`${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            {" "}
            {loading ? (
              <>
                adding <ClipLoader size={20} color="#ffffff" />
              </>
            ) : (
              <>Add Product</>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Additem;

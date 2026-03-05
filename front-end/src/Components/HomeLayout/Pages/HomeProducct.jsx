import React, { useEffect, useState } from "react";
import { product_url } from "../../../Config/SarverURL";
import axios from "axios";
import {Button} from "@heroui/react";
import { FaArrowRight } from "react-icons/fa";
import HomeProductCart from "../subPage/HomeProductCart";
import { useNavigate } from "react-router-dom";

const HomeProducct = () => {
  const [homeProduct, setHomeProduct] = useState([]);
  const [loading, setLoading] = useState(false);
//  navigate other route 
const navigate = useNavigate()
  const getHomeProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${product_url}/user/get`);
      if (res?.data?.success) {
        setHomeProduct(res?.data?.producList);
      } else {
        console.log(`product fatch fail`);
        console.log(res?.data?.message);
      }
    } catch (error) {
      console.log(`product fatch error`);
      console.log(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getHomeProduct();
  }, []);
  return (
    <>
      <div className="p-10 flex flex-col space-y-5 md:space-y-10  ">
       <div className="flex  justify-between items-center">
         <h2 className="text-2xl font-semibold" >Top 10 Products </h2>
         <Button color="primary" className="cursor-pointer" onClick={()=>navigate("/shop")}>show More <FaArrowRight/> </Button>
       </div>
       {/* product cart  */}
       <HomeProductCart homeProduct={homeProduct}/>
      </div>
    </>
  );
};

export default HomeProducct;

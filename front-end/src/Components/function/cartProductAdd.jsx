import { useContext } from "react";
import { AuthContex } from "../../Auth/authContex";
import { toast } from "react-toastify";

const useCart = () => {
  const { setUserCart,userCart,token } = useContext(AuthContex);

  const addCartProduct = (product) => {
    if (!token) {
        return toast.error("login frist")
        
    }
    const exitProduct= userCart.find(item=>item?._id===product?._id)
    if (exitProduct) {
      return toast.warning(`${product?.productName} is already exist`)
      
    }
    setUserCart(prev => [...prev, {...product, quantity:1}]);
  };

  return { addCartProduct };
};

export default useCart;
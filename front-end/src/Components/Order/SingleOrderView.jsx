import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { order_api } from "../../Config/SarverURL";
import { AuthContex } from "../../Auth/authContex";
import { toast } from "react-toastify";

const SingleOrderView = () => {
  const { orderId } = useParams();
  const { token } = useContext(AuthContex);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);

  const getSingleOrder = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${order_api}/user/get/${orderId}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res?.data?.success) {
        setOrder(res?.data?.myOrder);
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
    if (token) {
      getSingleOrder();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg">
        Loading order...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500">
        No order found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold">Order Details</h2>
            <p className="text-sm text-gray-500">Order ID: {order._id}</p>
            <p className="text-sm text-gray-500">
              Date: {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          <div>
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium
              ${
                order.orderStatus === "delivered"
                  ? "bg-green-100 text-green-600"
                  : order.orderStatus === "pending"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {order.orderStatus}
            </span>
          </div>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Customer Information</h3>
          <p><strong>Name:</strong> {order.customerName}</p>
          <p><strong>Email:</strong> {order.customerEmail}</p>
          <p><strong>Phone:</strong> {order.customerPhone}</p>
          <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-4">Ordered Products</h3>

          <div className="space-y-4">
            {order.orderProducts.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b pb-3 gap-3"
              >
                <img
                  src={item?.images[0] || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcCBHgbS23kyBw2r8Pquu19UtKZnrZmFUx1g&s"}
                  alt={item.productName}
                  className="w-16 h-16 object-cover rounded-md"
                />

                <div className="flex-1">
                  <p className="font-medium">{item.productName}</p>
                  <p className="text-sm text-gray-500">
                    Price: ৳ {item.price}
                  </p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <div className="font-semibold text-blue-600">
                  ৳ {item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border rounded-lg p-4 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>৳ {order.subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Payment Method</span>
            <span>{order.paymentMethod}</span>
          </div>

          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>Total</span>
            <span>৳ {order.subtotal}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SingleOrderView;

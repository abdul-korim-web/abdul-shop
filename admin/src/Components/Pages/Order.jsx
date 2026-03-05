import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { order_api_url } from "../../config";
import { AuthContext } from "../Auth/AuthContext";
import { toast } from "react-toastify";
import OrderStatusUpdate from "./Modal/Order/updateStatus";
import { useDisclosure } from "@heroui/react";

const Order = () => {
  const [totalOrder, setTotalOrder] = useState([]);
  const [selectOrder, setSelectOrder] = useState({});
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getOrder = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${order_api_url}/get`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (res?.data?.success) {
        setTotalOrder(res?.data?.orderList);
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
    if (token) {
      getOrder();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">📦 My Product Orders</h2>

        {totalOrder.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">No Orders Found</div>
        ) : (
          <div className="space-y-6">
            {totalOrder.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-md p-6 border"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b pb-4">
                  <div>
                    <p className="font-semibold text-lg">
                      Order ID: {order._id.slice(-6)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex gap-4 items-center">
                    <span className="text-sm font-medium">
                      Payment: {order.paymentMethod}
                    </span>

                    <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold ${
                        order.orderStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.orderStatus === "Confirmed"
                            ? "bg-blue-100 text-blue-700"
                            : order.orderStatus === "shipped"
                              ? "bg-purple-100 text-purple-700"
                              : order.orderStatus === "delivered"
                                ? "bg-green-100 text-green-700"
                                : order.orderStatus === "cancelled"
                                  ? "bg-red-100 text-red-600"
                                  : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Customer Name</p>
                    <p>{order.customerName}</p>
                  </div>

                  <div>
                    <p className="font-medium">Email</p>
                    <p>{order.customerEmail}</p>
                  </div>

                  <div>
                    <p className="font-medium">Phone</p>
                    <p>{order.customerPhone}</p>
                  </div>

                  <div>
                    <p className="font-medium">Shipping Address</p>
                    <p className="whitespace-pre-line text-gray-700">
                      {order.shippingAddress}
                    </p>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  {order.orderProducts.map((product) => (
                    <div
                      key={product._id}
                      className="flex justify-between items-center bg-gray-50 rounded-lg p-4"
                    >
                      <div>
                        <p className="font-medium">{product.productName}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {product.quantity}
                        </p>
                      </div>

                      <div className="font-semibold text-blue-600">
                        ৳ {product.price * product.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-between items-center border-t pt-4">
                  <div className="text-lg font-bold">
                    Seller Total: ৳ {order.subtotal}
                  </div>

                  <button
                    onClick={() => {
                      onOpen();
                      setSelectOrder(order);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
                  >
                    Update Status
                  </button>
                  <OrderStatusUpdate
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    selectOrder={selectOrder}
                    reFreshOrderList={getOrder}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;

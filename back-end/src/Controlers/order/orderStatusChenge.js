import Order from "../../Models/orderSchema.js";

const orderStatusChenge = async (req, res, next) => {
  try {
    const productId = req.params?.productId;
    const {orderStatus} = req.body;
    // console.log(orderStatus);
    const changeStatus = await Order.findByIdAndUpdate(productId, {
      orderStatus: orderStatus,
    });
    // console.log(changeStatus);
    if (!changeStatus) {
      return res
        .status(400)
        .json({ success: false, message: "order status change fail" });
    }
    res
      .status(200)
      .json({ success: true, message: "order status change successfully" });
  } catch (error) {
    next(error);
  }
};

export default orderStatusChenge;

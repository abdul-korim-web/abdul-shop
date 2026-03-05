import Order from "../../../Models/orderSchema.js";

const userGetOrder = async (req, res, next) => {
  try {
    const userId = req?._id;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "user id must be required" });
    }
    const orders = await Order.find({ orderBy: userId });
    if (!orders?.length) {
      return res
        .status(400)
        .json({ success: false, message: "No Order Found" });
    }
    res.status(200).json({ success: true, message: "Orders Found", orders });
  } catch (error) {
    next(error);
  }
};
export default userGetOrder;

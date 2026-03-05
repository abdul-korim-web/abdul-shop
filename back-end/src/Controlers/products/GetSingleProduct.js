import Product from "../../Models/ProductSchema.js";

const GetSingleProduct = async (req, res, next) => {
  try {
    const { adminId, productId } = req.params;
    const product = await Product.findOne({ _id: productId, createBY: adminId }).populate("createBY","-password");
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "product not found" });
    }
    res.status(200).json({success:true,message:"product found", product})
  } catch (error) {
    next(error);
  }
};

export default GetSingleProduct;

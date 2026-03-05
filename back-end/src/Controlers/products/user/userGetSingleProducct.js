import Product from "../../../Models/ProductSchema.js";


const userGetSingleProducct = async (req, res, next) => {
  try {
    const {  productId } = req.params;

    const product = await Product.findOne({ _id: productId })
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

export default userGetSingleProducct;

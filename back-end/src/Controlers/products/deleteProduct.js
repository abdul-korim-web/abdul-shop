import Product from "../../Models/ProductSchema.js";

const deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.body;
    console.log(productId);
    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "product id must be required" });
    }

    const ProductDelete = await Product.findByIdAndDelete(productId);
    res
      .status(200)
      .json({
        success: true,
        message: "product delete success",
        ProductDelete,
      });
  } catch (error) {
    next(error);
  }
};

export default deleteProduct;

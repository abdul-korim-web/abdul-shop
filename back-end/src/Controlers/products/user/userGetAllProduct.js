import Product from "../../../Models/ProductSchema.js";

const userGetAllProduct = async (req, res, next) => {
  try {
    const allProduct = await Product.find();
    if (!allProduct) {
      return res
        .status(400)
        .json({ success: false, message: "Product notg found" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "all product found ",
        totalProduct: allProduct.length,
        allProduct,
      });
  } catch (error) {
    next(error);
  }
};
export default userGetAllProduct;

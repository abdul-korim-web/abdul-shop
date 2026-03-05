import Product from "../../../Models/ProductSchema.js";


const userGetProduct = async(req,res,next)=>{
 try {
    const producList = await Product.find().populate(`createBY`,"-password -email").limit(10)
    res.status(200).json({success:true,message:"Product Featch successfully",producList})
 } catch (error) {
    next(error)
 }
}






export default userGetProduct
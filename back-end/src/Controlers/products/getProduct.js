import Product from "../../Models/ProductSchema.js"

const getProduct = async(req,res,next)=>{
 try {
    const adminId = req._id
   //  console.log(adminId);
    const producList = await Product.find({createBY:adminId}).populate(`createBY`,"-password")
    res.status(200).json({success:true,message:"Product Featch successfully",producList})
 } catch (error) {
    next(error)
 }
}






export default getProduct
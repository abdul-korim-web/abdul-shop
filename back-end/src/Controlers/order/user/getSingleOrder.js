import Order from "../../../Models/orderSchema.js"

const getSingleOrder = async(req,res,next)=>{
    try {
        const {orderId}  = req.params
        const myOrder = await Order.findById(orderId)
        if (!myOrder) {
            return res.status(400).json({success:false,message:"order not found"})

        }
        res.status(200).json({success:true,message:"order found successfully",myOrder})
    } catch (error) {
        next(error)
    }
}

export default getSingleOrder
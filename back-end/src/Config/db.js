import mongoose from "mongoose"
export const databaseConnection= async()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URI)
        console.log(`database connection successfully`);

    } catch (error) {
        console.log(error.message);
        console.log(`database connection fail`);
    }
}
import { v2 as cloudinary } from "cloudinary";
const connectCloudnary = async () => {
  try {
    await cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });
    console.log(`cloudinary connecttion successfull`);
  } catch (error) {
    next(error);
  }
};
export default connectCloudnary;

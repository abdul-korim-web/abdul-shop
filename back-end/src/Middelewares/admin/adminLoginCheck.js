import jwt from "jsonwebtoken";
export const adminLoginCheck = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(` `)[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_ADMIN);
    const { _id, username, email } = decoded;
    req._id = _id;
    req.username = username;
    req.email = email;
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: "admin authentication fail" });
  }
};

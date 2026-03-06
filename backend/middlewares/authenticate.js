import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  try {
   
    const token = req.cookies.auth_token;

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT secret not configured");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

     req.user = {
      userId: decoded.userId,
     // role_id: decoded.role_id,
      email: decoded.email
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success:false,
      message: "Invalid or expired token"
    });
  }
};
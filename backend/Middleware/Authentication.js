import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.status(401).json({
      message: "No token provided, authorization denied",
      success: false,
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Token is not valid", success: false });
    }
    console.log(user);
    req.user = user; 
    next(); 
  });
}

export default authenticateToken;

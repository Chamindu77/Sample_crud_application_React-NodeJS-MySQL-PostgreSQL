// middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Extract token from Authorization header or cookies
  const token = req.header("Authorization")?.replace("Bearer ", "") || req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    // Verify the token and extract user info
    const verified = jwt.verify(token, process.env.SECRET);
    req.user = verified; 
    next(); 
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token." });
  }
};

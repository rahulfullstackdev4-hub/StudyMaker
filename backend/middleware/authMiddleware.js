
const { verifyToken } = require("@clerk/clerk-sdk-node");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      
      const payload = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      });

    
      let user = await User.findOne({ clerkId: payload.sub });
      if (!user) {
        
        user = await User.create({
          clerkId: payload.sub,
          name: payload.name || (payload.email_addresses && Array.isArray(payload.email_addresses) && payload.email_addresses.length > 0 ? payload.email_addresses[0]?.email_address : "Unknown"),
          email: (payload.email_addresses && Array.isArray(payload.email_addresses) && payload.email_addresses.length > 0 ? payload.email_addresses[0]?.email_address : "unknown@example.com"),
        });
      }
       


      req.user = user;
      return next();
    } catch (error) {
      console.error("Clerk token verification failed:", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = protect;


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

      // Verify Clerk JWT token
      const payload = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      });

      // Find or create user based on Clerk ID
      let user = await User.findOne({ clerkId: payload.sub });
      if (!user) {
        // Create user if not exists (you might want to handle this via webhook)
        user = await User.create({
          clerkId: payload.sub,
          name: payload.name || (payload.email_addresses && Array.isArray(payload.email_addresses) && payload.email_addresses.length > 0 ? payload.email_addresses[0]?.email_address : "Unknown"),
          email: (payload.email_addresses && Array.isArray(payload.email_addresses) && payload.email_addresses.length > 0 ? payload.email_addresses[0]?.email_address : "unknown@example.com"),
        });
      }
       // Check your system clock if you are getting "JWT issued at date claim (iat) is in the future" error


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

const User = require("../models/User");


const handleClerkWebhook = async (req, res) => {
  try {
    const { type, data } = req.body;

    if (type === 'user.created') {
      const { id, email_addresses, first_name, last_name } = data;
      const email = email_addresses[0]?.email_address;
      const name = `${first_name} ${last_name}`.trim() || email;

      const userExists = await User.findOne({ clerkId: id });
      if (userExists) {
        return res.status(200).json({ message: "User already exists" });
      }

      const user = await User.create({
        clerkId: id,
        name,
        email,
      });

      res.status(201).json({ message: "User created successfully", user });
    } else {
      res.status(200).json({ message: "Event type not handled" });
    }
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ message: "Server error during webhook processing" });
  }
};

module.exports = { handleClerkWebhook };

import jwt from "jsonwebtoken";
import User from "../models/User.js";

// 🔐 AUTH + BAN CHECK
const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer")) {
    return res.status(401).json({ msg: "No token" });
  }

  try {
    token = token.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    // 🚫 BAN CHECK
    if (user.ban && user.ban.until > new Date()) {
      return res.status(403).json({
        msg: "User is banned",
        reason: user.ban.reason,
        until: user.ban.until,
      });
    }

    req.user = user; // ⚡ endi full user object
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

export default protect;

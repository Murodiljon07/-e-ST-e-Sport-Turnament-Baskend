import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.role !== "admin") {
    return res.status(401).json({ msg: "Not admin" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).json({ msg: "Wrong password" });
  }

  res.json({
    token: generateToken(user._id),
  });
};

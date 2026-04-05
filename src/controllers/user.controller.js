import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import generateToken from "../utils/generateToken.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // passwordni ko'rsatmaymiz
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  const now = new Date();

  // Name 2 haftada 1 marta
  if (req.body.fullName) {
    if (
      user.lastNameChange &&
      now - user.lastNameChange < 14 * 24 * 60 * 60 * 1000
    ) {
      return res
        .status(400)
        .json({ msg: "Name can be changed once every 14 days" });
    }
    user.fullName = req.body.fullName;
    user.lastNameChange = now;
  }

  // Avatar 2 haftada
  if (req.body.avatar) {
    if (
      user.lastAvatarChange &&
      now - user.lastAvatarChange < 14 * 24 * 60 * 60 * 1000
    ) {
      return res
        .status(400)
        .json({ msg: "Avatar can be changed once every 14 days" });
    }
    user.profile.avatar = req.body.avatar;
    user.lastAvatarChange = now;
  }

  if (
    user.lastCredentialChange &&
    now - user.lastCredentialChange < 7 * 24 * 60 * 60 * 1000
  ) {
    return res
      .status(400)
      .json({ msg: "Can change credentials once per week" });
  }

  await user.save();
  res.json(user);
};

export const register = async (req, res) => {
  try {
    const { fullName, age, country, games, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      age,
      country,
      games,
      email,
      password: hashedPassword,
    });

    if (!games || games.length === 0) {
      return res.status(400).json({ msg: "At least one game required" });
    }

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      token: generateToken(user._id), // 🔥 TOKEN
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        token: generateToken(user._id), // 🔥 TOKEN
      });
    } else {
      res.status(401).json({ msg: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(404).json({ msg: "User not found" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user.resetOTP = otp;
  user.resetOTPExpire = Date.now() + 10 * 60 * 1000; // 10 min

  await user.save();

  // bu yerda email service (nodemailer)
  console.log("OTP:", otp);

  res.json({ msg: "OTP sent" });
};

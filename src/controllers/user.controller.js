import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

// Get all users (no password)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Register
export const register = async (req, res) => {
  try {
    const { fullName, age, country, games, email, password } = req.body;

    if (!games || games.length === 0) {
      return res.status(400).json({ msg: "At least one game required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    if (age < 16)
      return res.status(400).json({
        msg: `You are not old enough to register for tournaments! Incorrect age entry will result in restriction from tournaments and ban from the system!!!! If the age restriction is detected even during participation in the tournament, the promised prize will not be awarded!!
Please enter your age correctly`,
      });

    const user = await User.create({
      fullName,
      age,
      country,
      games,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      games: user.games,
      age: user.age,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(401).json({ msg: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ msg: "Invalid email or password" });

    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update profile (name/avatar/password/email)
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const now = new Date();

    // Name change
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

    // Avatar change
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

    // Credentials update (password/email)
    if (req.body.password || req.body.email) {
      if (
        user.lastCredentialChange &&
        now - user.lastCredentialChange < 7 * 24 * 60 * 60 * 1000
      ) {
        return res
          .status(400)
          .json({ msg: "Credentials can be changed once per week" });
      }

      if (req.body.password)
        user.password = await bcrypt.hash(req.body.password, 10);
      if (req.body.email && req.body.email !== user.email) {
        const exists = await User.findOne({ email: req.body.email });
        if (exists)
          return res.status(400).json({ msg: "Email already in use" });
        user.email = req.body.email;
      }

      user.lastCredentialChange = now;
    }

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Forgot password (send OTP)
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOTP = otp;
    user.resetOTPExpire = Date.now() + 10 * 60 * 1000; // 10 min
    await user.save();

    console.log("OTP:", otp); // Production: send email via nodemailer

    res.json({ msg: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

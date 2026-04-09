import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";
const JWT_EXPIRE = process.env.JWT_EXPIRE || "7d";

/** Register user service */
export const registerUserService = async (data) => {
  const {
    avatar,
    fullName,
    nickname,
    email,
    password,
    age,
    country,
    mainGame,
    games,
  } = data;

  // Email allaqachon mavjudligini tekshirish
  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email already registered");

  const hashedPassword = await bcrypt.hash(password, 10);

  // User create
  const user = await User.create({
    fullName,
    nickname,
    mainGame,
    email,
    password: hashedPassword,
    age,
    country,
    games,
  });

  return user;
};

/** Login user service */
export const loginUserService = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) return null;

  const match = await bcrypt.compare(password, user.password);
  if (!match) return null;

  return user;
};

/** Get current user */
export const getMeService = async (userId) => {
  return await User.findById(userId).select("-password").populate("clan");
};

/** Generate JWT token */
export const generateTokenService = (userId, role) => {
  return jwt.sign({ id: userId, role }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

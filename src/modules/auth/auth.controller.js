import {
  registerUserService,
  loginUserService,
  getMeService,
  generateTokenService,
} from "./auth.service.js";
import { registerValidation, loginValidation } from "./auth.validation.js";

/** Register user */
export const registerUser = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const user = await registerUserService(req.body);
  const token = generateTokenService(user._id, user.role);
  res.status(201).json({ user, token });
};

/** Login user */
export const loginUser = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const user = await loginUserService(req.body.email, req.body.password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const token = generateTokenService(user._id, user.role);
  res.json({ user, token });
};

/** Get current user */
export const getMe = async (req, res) => {
  const user = await getMeService(req.user._id);
  res.json(user);
};

/** Refresh token */
export const refreshToken = async (req, res) => {
  // Optional: implement refresh token logic if needed
  res.json({ message: "Refresh token endpoint" });
};

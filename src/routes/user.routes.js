import express from "express";
import {
  register,
  login,
  getAllUsers,
  forgotPassword,
  updateProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             username: ali
 *             email: ali@mail.com
 *             password: 123456
 *     responses:
 *       200:
 *         description: User registered
 */
router.post("/register", register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: ali@mail.com
 *             password: 123456
 *     responses:
 *       200:
 *         description: Login success
 */
router.post("/login", login);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/", getAllUsers);

/**
 * @swagger
 * /api/users/updateProfile:
 *   put:
 *     summary: Update user profile (name/avatar/password)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             fullName: "New Name"
 *             avatar: "avatar_url"
 *             password: "newpassword123"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */
router.put("/updateProfile", updateProfile);

/**
 * @swagger
 * /api/users/forgotPassword:
 *   post:
 *     summary: Send OTP to reset password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: "ali@mail.com"
 *     responses:
 *       200:
 *         description: OTP sent to email
 */
router.post("/forgotPassword", forgotPassword);

export default router;

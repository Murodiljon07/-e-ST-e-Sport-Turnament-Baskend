import express from "express";
import {
  register,
  login,
  getAllUsers,
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

export default router;

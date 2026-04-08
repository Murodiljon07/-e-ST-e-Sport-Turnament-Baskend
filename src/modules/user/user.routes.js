import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  banUser,
  unBanUser,
} from "./user.controller.js";
import { protect, admin } from "../../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/", protect, admin, getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User object
 */
router.get("/:id", protect, getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user info
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: Updated user
 */
router.put("/:id", protect, updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted user
 */
router.delete("/:id", protect, admin, deleteUser);

/**
 * @swagger
 * /api/users/{id}/ban:
 *   put:
 *     summary: Ban user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id/ban", protect, admin, banUser);

/**
 * @swagger
 * /api/users/{id}/unban:
 *   put:
 *     summary: Unban user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id/unban", protect, admin, unBanUser);

export default router;

import express from "express";
import protect from "../middleware/auth.js";
import adminOnly from "../middleware/adminOnly.js";

import {
  getUsers,
  getUser,
  deleteUser,
  banUser,
  unbanUser,
  getClansAdmin,
  deleteClanAdmin,
  createTournament,
  updateTournament,
  deleteTournament,
  getTournamentsAdmin,
} from "../controllers/admin.controller.js";

const router = express.Router();

// ================= USERS =================

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get("/users", protect, adminOnly, getUsers);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   get:
 *     summary: Get single user
 */
router.get("/users/:id", protect, adminOnly, getUser);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   delete:
 *     summary: Delete user
 */
router.delete("/users/:id", protect, adminOnly, deleteUser);

/**
 * @swagger
 * /api/admin/ban:
 *   post:
 *     summary: Ban user
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: "USER_ID"
 *             reason: "toxicity"
 *             days: 7
 */

router.post("/ban", protect, adminOnly, banUser);

/**
 * @swagger
 * /api/admin/unban:
 *   post:
 *     summary: Unban user
 */
router.post("/unban", protect, adminOnly, unbanUser);

// ================= CLANS =================

/**
 * @swagger
 * /api/admin/clans:
 *   get:
 *     summary: Get all clans
 */
router.get("/clans", protect, adminOnly, getClansAdmin);

/**
 * @swagger
 * /api/admin/clans/{id}:
 *   delete:
 *     summary: Delete clan
 */
router.delete("/clans/:id", protect, adminOnly, deleteClanAdmin);

// ================= TOURNAMENT =================

/**
 * @swagger
 * /api/admin/tournaments:
 *   get:
 *     summary: Get all tournaments
 */
router.get("/tournaments", protect, adminOnly, getTournamentsAdmin);

/**
 * @swagger
 * /api/admin/tournaments:
 *   post:
 *     summary: Create tournament
 */
router.post("/tournaments", protect, adminOnly, createTournament);

/**
 * @swagger
 * /api/admin/tournaments/{id}:
 *   put:
 *     summary: Update tournament
 */
router.put("/tournaments/:id", protect, adminOnly, updateTournament);

/**
 * @swagger
 * /api/admin/tournaments/{id}:
 *   delete:
 *     summary: Delete tournament
 */
router.delete("/tournaments/:id", protect, adminOnly, deleteTournament);

export default router;

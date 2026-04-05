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
  getTournamentById,
  createMatch,
  sendMatchInfo,
  submitResult,
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

/* *
 * @swagger
 * /api/admin/tournaments/{id}:
 */
router.get("/tournaments/:id", protect, adminOnly, getTournamentById);

/**
 * @swagger
 * /api/admin/tournaments/create:
 *   post:
 *     summary: Create tournament
 */
router.post("/tournaments/create", protect, adminOnly, createTournament);

/**
 * @swagger
 * /api/admin/tournaments/{id}:
 *   put:
 *     summary: Update tournament
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tournament ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "PUBG Masters"
 *             game: "PUBG"
 *             description: "Top players tournament"
 *             rules: "1v1, max 4 players per team"
 *             image: "url/to/image.jpg"
 *             maxPlayers: 4
 *             registrationDeadline: "2026-04-10T12:00:00Z"
 *             startTime: "2026-04-15T15:00:00Z"
 *     responses:
 *       200:
 *         description: Tournament updated successfully
 */
router.put("/tournaments/:id", protect, adminOnly, updateTournament);

/**
 * @swagger
 * /api/admin/tournaments/{id}:
 *   delete:
 *     summary: Delete tournament
 */
router.delete("/tournaments/:id", protect, adminOnly, deleteTournament);

/**
 * @swagger
 * /api/admin/match:
 *   post:
 *     summary: Create match
 */
router.post("/match", protect, adminOnly, createMatch);

/**
 * @swagger
 * /api/admin/match/send:
 *   post:
 *     summary: Send match room info to players
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             tournamentId: "123"
 *             matchIndex: 0
 */
router.post("/match/send", protect, adminOnly, sendMatchInfo);

/**
 * @swagger
 * /api/admin/match/result:
 *   post:
 *     summary: Submit match result
 */
router.post("/match/result", protect, adminOnly, submitResult);

export default router;

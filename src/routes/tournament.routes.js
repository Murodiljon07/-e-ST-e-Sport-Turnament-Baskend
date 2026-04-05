import express from "express";
import {
  createTournament,
  joinTournament,
  generateMatches,
} from "../controllers/tournament.controller.js";

import protect from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * /api/tournaments/create:
 *   post:
 *     summary: Create a new tournament
 *     tags: [Tournaments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "E-Sport Cup"
 *             game: "CS2"
 *             maxTeams: 16
 *     responses:
 *       200:
 *         description: Tournament created successfully
 */
router.post("/create", protect, createTournament);

/**
 * @swagger
 * /api/tournaments/join:
 *   post:
 *     summary: Join a tournament
 *     tags: [Tournaments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             tournamentId: "123"
 *             teamId: "456"
 *     responses:
 *       200:
 *         description: Joined tournament
 */
router.post("/join", protect, joinTournament);

/**
 * @swagger
 * /api/tournaments/generate/{id}:
 *   post:
 *     summary: Generate matches for tournament
 *     tags: [Tournaments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tournament ID
 *     responses:
 *       200:
 *         description: Matches generated
 */
router.post("/generate/:id", protect, generateMatches);

export default router;

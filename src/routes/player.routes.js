import express from "express";
import protect from "../middleware/auth.js";
import {
  getPlayerTournaments,
  getPlayerMatches,
  getPlayerMatchSlot,
  getPlayerStats,
  exitClan,
} from "../controllers/player.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/player/tournaments:
 *   get:
 *     summary: Get all tournaments player can join
 *     tags: [Player]
 *     security:
 *       - bearerAuth: []
 */
router.get("/tournaments", protect, getPlayerTournaments);

/**
 * @swagger
 * /api/player/matches:
 *   get:
 *     summary: Get all matches for player
 */
router.get("/matches", protect, getPlayerMatches);

/**
 * @swagger
 * /api/player/match/:matchId/slot:
 *   get:
 *     summary: Get player's slot/position in a match
 */
router.get("/match/:matchId/slot", protect, getPlayerMatchSlot);

/**
 * @swagger
 * /api/player/stats:
 *   get:
 *     summary: Get player's stats (kills, points, matches played)
 */
router.get("/stats", protect, getPlayerStats);

/**
 * @swagger
 * /api/player/exit-clan:
 *   post:
 *     summary: Exit player's current clan
 */
router.post("/exit-clan", protect, exitClan);

export default router;

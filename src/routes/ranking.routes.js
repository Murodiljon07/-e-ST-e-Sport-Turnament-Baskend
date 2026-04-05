import express from "express";
import { topPlayers, topClans } from "../controllers/ranking.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/ranking/players:
 *   get:
 *     summary: Get top players ranking
 *     tags: [Ranking]
 *     responses:
 *       200:
 *         description: List of top players
 */
router.get("/players", topPlayers);

/**
 * @swagger
 * /api/ranking/clans:
 *   get:
 *     summary: Get top clans ranking
 *     tags: [Ranking]
 *     responses:
 *       200:
 *         description: List of top clans
 */
router.get("/clans", topClans);

export default router;

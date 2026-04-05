import express from "express";
import {
  startVote,
  voteLeader,
  checkVote,
} from "../controllers/vote.controller.js";
import protect from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * /api/votes/start:
 *   post:
 *     summary: Start a voting process
 *     tags: [Votes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Voting started successfully
 */
router.post("/start", protect, startVote);

/**
 * @swagger
 * /api/votes/vote:
 *   post:
 *     summary: Vote for a leader
 *     tags: [Votes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             clanId: "123"
 *             leaderId: "456"
 *     responses:
 *       200:
 *         description: Vote submitted
 */
router.post("/vote", protect, voteLeader);

/**
 * @swagger
 * /api/votes/result/{id}:
 *   get:
 *     summary: Get voting result by ID
 *     tags: [Votes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Vote ID
 *     responses:
 *       200:
 *         description: Vote result data
 */
router.get("/result/:id", protect, checkVote);

export default router;

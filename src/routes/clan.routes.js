import express from "express";
import {
  createClan,
  joinClan,
  leaveClan,
  makeElder,
} from "../controllers/clan.controller.js";

import protect from "../middleware/auth.js";

const router = express.Router();

// router.get("/",)

/**
 * @swagger
 * /api/clans/create:
 *   post:
 *     summary: Create a new clan
 *     tags: [Clans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Pro Gamers"
 *             description: "Top esports clan"
 *     responses:
 *       200:
 *         description: Clan created successfully
 */
router.post("/create", protect, createClan);

/**
 * @swagger
 * /api/clans/join:
 *   post:
 *     summary: Join a clan
 *     tags: [Clans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             clanId: "123"
 *     responses:
 *       200:
 *         description: Joined clan
 */
router.post("/join", protect, joinClan);

/**
 * @swagger
 * /api/clans/leave:
 *   post:
 *     summary: Leave a clan
 *     tags: [Clans]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Left clan
 */
router.post("/leave", protect, leaveClan);

/**
 * @swagger
 * /api/clans/make-elder:
 *   post:
 *     summary: Promote a member to elder
 *     tags: [Clans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: "456"
 *     responses:
 *       200:
 *         description: User promoted to elder
 */
router.post("/make-elder", protect, makeElder);

export default router;

import express from "express";
import {
  createClan,
  getClans,
  getClanById,
  updateClan,
  deleteClan,
} from "./clan.controller.js";
import { protect, admin } from "../../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Clan
 *   description: Clan management
 */

/**
 * @swagger
 * /api/clans:
 *   get:
 *     summary: Get all clans
 *     tags: [Clan]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of clans
 */
router.get("/", protect, getClans);

/**
 * @swagger
 * /api/clans/{id}:
 *   get:
 *     summary: Get clan by ID
 *     tags: [Clan]
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
 *         description: Clan object
 */
router.get("/:id", protect, getClanById);

/**
 * @swagger
 * /api/clans:
 *   post:
 *     summary: Create new clan
 *     tags: [Clan]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClanCreate'
 *     responses:
 *       201:
 *         description: Clan created
 */
router.post("/", protect, createClan);

/**
 * @swagger
 * /api/clans/{id}:
 *   put:
 *     summary: Update clan
 *     tags: [Clan]
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
 *             $ref: '#/components/schemas/ClanUpdate'
 *     responses:
 *       200:
 *         description: Clan updated
 */
router.put("/:id", protect, admin, updateClan);

/**
 * @swagger
 * /api/clans/{id}:
 *   delete:
 *     summary: Delete clan
 *     tags: [Clan]
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
 *         description: Clan deleted
 */
router.delete("/:id", protect, admin, deleteClan);

export default router;

import express from "express";
import {
  createTournament,
  getTournaments,
  getTournamentById,
  updateTournament,
  deleteTournament,
} from "./tournament.controller.js";
import { protect, admin } from "../../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tournament
 *   description: Tournament management
 */

/**
 * @swagger
 * /api/tournaments:
 *   get:
 *     summary: Get all tournaments
 *     tags: [Tournament]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tournaments
 */
router.get("/", protect, getTournaments);

/**
 * @swagger
 * /api/tournaments/{id}:
 *   get:
 *     summary: Get tournament by ID
 *     tags: [Tournament]
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
 *         description: Tournament object
 */
router.get("/:id", protect, getTournamentById);

/**
 * @swagger
 * /api/tournaments:
 *   post:
 *     summary: Create new tournament
 *     tags: [Tournament]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TournamentCreate'
 *     responses:
 *       201:
 *         description: Tournament created
 */
router.post("/", protect, admin, createTournament);

/**
 * @swagger
 * /api/tournaments/{id}:
 *   put:
 *     summary: Update tournament
 *     tags: [Tournament]
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
 *             $ref: '#/components/schemas/TournamentUpdate'
 *     responses:
 *       200:
 *         description: Tournament updated
 */
router.put("/:id", protect, admin, updateTournament);

/**
 * @swagger
 * /api/tournaments/{id}:
 *   delete:
 *     summary: Delete tournament
 *     tags: [Tournament]
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
 *         description: Tournament deleted
 */
router.delete("/:id", protect, admin, deleteTournament);

export default router;

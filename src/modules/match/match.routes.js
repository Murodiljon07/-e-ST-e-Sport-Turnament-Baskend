import express from "express";
import {
  createMatch,
  getMatches,
  getMatchById,
  updateMatch,
  deleteMatch,
} from "./match.controller.js";
import { protect, admin } from "../../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Match
 *   description: Tournament match management
 */

/**
 * @swagger
 * /api/matches:
 *   get:
 *     summary: Get all matches
 *     tags: [Match]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of matches
 */
router.get("/", protect, getMatches);

/**
 * @swagger
 * /api/matches/{id}:
 *   get:
 *     summary: Get match by ID
 *     tags: [Match]
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
 *         description: Match object
 */
router.get("/:id", protect, getMatchById);

/**
 * @swagger
 * /api/matches:
 *   post:
 *     summary: Create new match
 *     tags: [Match]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MatchCreate'
 *     responses:
 *       201:
 *         description: Match created
 */
router.post("/", protect, admin, createMatch);

/**
 * @swagger
 * /api/matches/{id}:
 *   put:
 *     summary: Update match
 *     tags: [Match]
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
 *             $ref: '#/components/schemas/MatchUpdate'
 *     responses:
 *       200:
 *         description: Match updated
 */
router.put("/:id", protect, admin, updateMatch);

/**
 * @swagger
 * /api/matches/{id}:
 *   delete:
 *     summary: Delete match
 *     tags: [Match]
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
 *         description: Match deleted
 */
router.delete("/:id", protect, admin, deleteMatch);

export default router;

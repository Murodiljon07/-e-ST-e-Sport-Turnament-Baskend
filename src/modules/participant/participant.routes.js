import express from "express";
import {
  createParticipant,
  getParticipants,
  getParticipantById,
  updateParticipant,
  deleteParticipant,
} from "./participant.controller.js";
import { protect, admin } from "../../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Participant
 *   description: Tournament participant management
 */

/**
 * @swagger
 * /api/participants:
 *   get:
 *     summary: Get all participants
 *     tags: [Participant]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of participants
 */
router.get("/", protect, getParticipants);

/**
 * @swagger
 * /api/participants/{id}:
 *   get:
 *     summary: Get participant by ID
 *     tags: [Participant]
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
 *         description: Participant object
 */
router.get("/:id", protect, getParticipantById);

/**
 * @swagger
 * /api/participants:
 *   post:
 *     summary: Create new participant
 *     tags: [Participant]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ParticipantCreate'
 *     responses:
 *       201:
 *         description: Participant created
 */
router.post("/", protect, createParticipant);

/**
 * @swagger
 * /api/participants/{id}:
 *   put:
 *     summary: Update participant
 *     tags: [Participant]
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
 *             $ref: '#/components/schemas/ParticipantUpdate'
 *     responses:
 *       200:
 *         description: Participant updated
 */
router.put("/:id", protect, admin, updateParticipant);

/**
 * @swagger
 * /api/participants/{id}:
 *   delete:
 *     summary: Delete participant
 *     tags: [Participant]
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
 *         description: Participant deleted
 */
router.delete("/:id", protect, admin, deleteParticipant);

export default router;

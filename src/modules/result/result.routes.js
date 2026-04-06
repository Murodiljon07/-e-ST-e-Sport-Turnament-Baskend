import express from "express";
import {
  createResult,
  getResults,
  getResultById,
  updateResult,
  deleteResult,
} from "./result.controller.js";
import { protect, admin } from "../../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Result
 *   description: Match or Tournament Result management
 */

/**
 * @swagger
 * /api/results:
 *   get:
 *     summary: Get all results
 *     tags: [Result]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of results
 */
router.get("/", protect, getResults);

/**
 * @swagger
 * /api/results/{id}:
 *   get:
 *     summary: Get result by ID
 *     tags: [Result]
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
 *         description: Result object
 */
router.get("/:id", protect, getResultById);

/**
 * @swagger
 * /api/results:
 *   post:
 *     summary: Create new result
 *     tags: [Result]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResultCreate'
 *     responses:
 *       201:
 *         description: Result created
 */
router.post("/", protect, admin, createResult);

/**
 * @swagger
 * /api/results/{id}:
 *   put:
 *     summary: Update result
 *     tags: [Result]
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
 *             $ref: '#/components/schemas/ResultUpdate'
 *     responses:
 *       200:
 *         description: Result updated
 */
router.put("/:id", protect, admin, updateResult);

/**
 * @swagger
 * /api/results/{id}:
 *   delete:
 *     summary: Delete result
 *     tags: [Result]
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
 *         description: Result deleted
 */
router.delete("/:id", protect, admin, deleteResult);

export default router;

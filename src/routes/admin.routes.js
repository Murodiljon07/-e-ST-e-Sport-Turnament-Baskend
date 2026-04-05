import express from "express";
import { banUser } from "../controllers/admin.controller.js";
import protect from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * /api/admin/ban:
 *   post:
 *     summary: Ban a user (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: "123"
 *             reason: "Violation of rules"
 *     responses:
 *       200:
 *         description: User banned successfully
 *       403:
 *         description: Not authorized
 */
router.post("/ban", protect, banUser);

export default router;

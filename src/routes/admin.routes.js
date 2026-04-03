import express from "express";
import { banUser } from "../controllers/admin.controller.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.post("/ban", protect, banUser);

export default router;

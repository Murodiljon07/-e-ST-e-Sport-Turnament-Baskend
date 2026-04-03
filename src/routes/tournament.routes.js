import express from "express";
import {
  createTournament,
  joinTournament,
  generateMatches,
} from "../controllers/tournament.controller.js";

import protect from "../middleware/auth.js";

const router = express.Router();

router.post("/create", protect, createTournament);
router.post("/join", protect, joinTournament);
router.post("/generate/:id", protect, generateMatches);

export default router;

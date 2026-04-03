import express from "express";
import {
  startVote,
  voteLeader,
  checkVote,
} from "../controllers/vote.controller.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.post("/start", protect, startVote);
router.post("/vote", protect, voteLeader);
router.get("/result/:id", protect, checkVote);

export default router;

import express from "express";
import {
  createClan,
  joinClan,
  leaveClan,
  makeElder,
} from "../controllers/clan.controller.js";

import protect from "../middleware/auth.js";

const router = express.Router();

router.post("/create", protect, createClan);
router.post("/join", protect, joinClan);
router.post("/leave", protect, leaveClan);
router.post("/make-elder", protect, makeElder);

export default router;

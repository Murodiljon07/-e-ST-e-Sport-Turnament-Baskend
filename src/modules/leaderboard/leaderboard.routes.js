import express from "express";

import {
  getLeadBoardTurnaments,
  getLeadBoardPlayers,
} from "./leadedboard.controller.js";

const router = express.Router();

router.get("/turnaments", getLeadBoardTurnaments);

router.get("/players", getLeadBoardPlayers);

export default router;

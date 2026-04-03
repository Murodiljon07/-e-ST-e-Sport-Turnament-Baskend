import express from "express";
import { topPlayers, topClans } from "../controllers/ranking.controller.js";

const router = express.Router();

router.get("/players", topPlayers);
router.get("/clans", topClans);

export default router;

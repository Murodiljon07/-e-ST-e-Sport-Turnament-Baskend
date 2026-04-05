import express from "express";
import {
  createTournament,
  joinTournament,
  generateMatches,
  submitMatchResults,
  getTournamentById,
  getTournaments,
} from "../controllers/tournament.controller.js";

import protect from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * /api/tournaments/create:
 *   post:
 *     summary: Create a new tournament
 *     tags: [Tournaments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "E-Sport Cup"
 *             game: "CS2"
 *             maxTeams: 16
 *     responses:
 *       200:
 *         description: Tournament created successfully
 */
router.post("/create", protect, createTournament);

/**
 * @swagger
 * /api/tournaments/join:
 *   post:
 *     summary: Join a tournament
 *     tags: [Tournaments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             tournamentId: "123"
 *             teamId: "456"
 *     responses:
 *       200:
 *         description: Joined tournament
 */
router.post("/join", protect, joinTournament);

/**
 * @swagger
 * /api/tournaments/generate/{id}:
 *   post:
 *     summary: Generate matches for tournament
 *     tags: [Tournaments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tournament ID
 *     responses:
 *       200:
 *         description: Matches generated
 */
router.post("/generate/:id", protect, generateMatches);

/**
 * @swagger
 * /api/tournaments/results/{id}:
 *   post:
 *     summary: Submit PUBG match results
 *     tags: [Tournaments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tournament ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             matchId: "MATCH_ID"
 *             results:
 *               - clan: "CLAN_ID"
 *                 position: 1
 *                 players:
 *                   - user: "USER_ID"
 *                     kills: 5
 *                   - user: "USER_ID"
 *                     kills: 3
 *                   - user: "USER_ID"
 *                     kills: 2
 *                   - user: "USER_ID"
 *                     kills: 1
 *     responses:
 *       200:
 *         description: Results submitted
 */
router.post("/results/:id", protect, submitMatchResults);

router.get("/tournaments/recommended", protect, async (req, res) => {
  const user = await User.findById(req.user.id);

  const games = user.games.map((g) => g.name);

  const tournaments = await Tournament.find({
    game: { $in: games },
  });

  res.json(tournaments);
});

// ================= PLAYER VIEW =================

/**
 * @swagger
 * /api/tournaments:
 *   get:
 *     summary: Get all tournaments (public view)
 *     tags: [Tournaments]
 */
router.get("/", getTournaments);

/**
 * @swagger
 * /api/tournaments/{id}:
 *   get:
 *     summary: Get tournament details by ID
 */
router.get("/:id", getTournamentById);

/**
 * @swagger
 * /api/tournaments/join:
 *   post:
 *     summary: Join tournament (leader/elder only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             tournamentId: "TOURNAMENT_ID"
 *             clanId: "CLAN_ID"
 */
router.post("/join", protect, joinTournament);

export default router;

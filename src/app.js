import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import clanRoutes from "./modules/clan/clan.routes.js";
import tournamentRoutes from "./modules/tournament/tournament.routes.js";
import participantRoutes from "./modules/participant/participant.routes.js";
import matchRoutes from "./modules/match/match.routes.js";
import teamRoutes from "./modules/team/team.routes.js";
import resultRoutes from "./modules/result/result.routes.js";
import notificationRoutes from "./modules/notification/notification.routes.js";

import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

// Swagger
app.use("/api-docs/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/clans", clanRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/participants", participantRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/notifications", notificationRoutes);

// Error handler
app.use(errorHandler);

export default app;

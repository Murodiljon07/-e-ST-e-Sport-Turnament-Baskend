import express from "express";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import userRoutes from "./routes/user.routes.js";
import clanRoutes from "./routes/clan.routes.js";
import voteRoutes from "./routes/vote.routes.js";
import tournamentRoutes from "./routes/tournament.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import rankingRoutes from "./routes/ranking.routes.js";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// 🔥 Swagger config
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Sport Tournament API",
      version: "1.0.0",
      description: "https://e-st-e-sport-turnament-baskend.onrender.com",
    },
    tags: [
      { name: "Users" },
      { name: "Clans" },
      { name: "Tournaments" },
      { name: "Votes" },
      { name: "Ranking" },
      { name: "Admin" },
    ],
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.js"], // commentlarni qayerdan o‘qiydi
};

const swaggerSpec = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ROUTES
app.use("/api/ranking", rankingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/votes", voteRoutes);
app.use("/api/users", userRoutes);
app.use("/api/clans", clanRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

export default app;

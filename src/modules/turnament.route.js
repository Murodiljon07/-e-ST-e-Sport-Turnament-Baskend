import app from "../app";

// Import the controller function
import { createTurnament } from "./turnament.controller.js";

app.post("/turnament", createTurnament);

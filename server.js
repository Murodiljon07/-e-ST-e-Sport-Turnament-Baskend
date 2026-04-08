import dotenv from "dotenv";
import http from "http";
import ora from "ora";
import chalk from "chalk";
import figlet from "figlet";

dotenv.config();

import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { initSocket } from "./src/socket/socket.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

console.log(
  chalk.blue(figlet.textSync("E-Sport API", { horizontalLayout: "full" })),
);

// 🔄 Spinner start
const spinner = ora("Connecting to database...").start();

initSocket(server);

connectDB()
  .then(() => {
    spinner.succeed(chalk.green("Database connected successfully 🚀"));

    app.get("/", (req, res) =>
      res.send("Welcome to E-Sport Tournament API 🚀"),
    );

    server.listen(PORT, () => {
      console.log(chalk.cyan(`\n🌐 Server running on port ${PORT}`));
      console.log(
        chalk.yellow(`📄 Swagger docs: http://localhost:${PORT}/api-docs/`),
      );
    });
  })
  .catch((err) => {
    spinner.fail(chalk.red("Database connection failed ❌"));
    console.error(err);
  });

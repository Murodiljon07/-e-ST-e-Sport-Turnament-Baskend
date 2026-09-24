import app from "./src/app.js";

const PORT = 8080;

app.get("/", (req, res) => {
  res.send("Welcome to the e-Sport server");
});

app.listen(PORT, () => {
  console.log("\nhttp://localhost:" + PORT);
});

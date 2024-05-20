import express from "express";
import "dotenv/config.js";
const app = express();
import path from "path";
import cors from "cors";
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
import corsOptions from "./config/corsOptions.js";
const PORT = process.env.PORT || 8000;
// const API_KEY = process.env.API_KEY;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
import ApiRoutes from "./routes/api.js";
import RootRoutes from "./routes/root.js";
app.use(cors(corsOptions));
app.use("/", RootRoutes);
app.use("/link", ApiRoutes);

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not Found" });
  } else {
    res.type("txt").send("404 not Found");
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

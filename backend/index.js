require("dotenv").config();
const express = require("express");
const app = express();

const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const allowedOrigins = require("./config/allowedOrigins");

// import path from "path";
// import cors from "cors";
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// import corsOptions from "./config/corsOptions.js";
const PORT = process.env.PORT || 8000;
// const API_KEY = process.env.API_KEY;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const link = require("./routes/api");

const root = require("./routes/root");

app.use(cors(corsOptions));

//routes
app.use("/", root);

app.use("/link", link);

//serve static files

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

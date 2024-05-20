require("dotenv").config();
const express = require("express");
const app = express();

const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const allowedOrigins = require("./config/allowedOrigins");

const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const link = require("./routes/api");

app.use(cors(corsOptions));
app.get("/", (req, res) => res.send("Express on Vercel"));

app.use("/link", link);

//serve static files

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

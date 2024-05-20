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

const link = require("./routes/api/api");

const root = require("./routes/root");

app.use(cors(corsOptions));

//routes
app.use("/", root);

app.use("/link", link);

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

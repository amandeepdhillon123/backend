const express = require("express");
const app = express();
const dbConnect = require("./config/database");
const routes = require("./routes/routes");
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/v1", routes);

dbConnect();

app.listen(PORT, () => {
  console.log(`app runs on at ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("<h1> hello sercver is on</h1>");
});

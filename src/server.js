const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 8080; // Step 1

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/my_database", {
  useNewUrlParser: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html")); // relative path
  });
}

app.listen(PORT, () => {
  console.log(`Server is starting at PORT: ${PORT}`);
});

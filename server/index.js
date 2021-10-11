const express = require("express");
const app = express();
const jwt = require("jwt-simple");

const auth = require("./auth.js");
const articles = require("./articles.js");

app.use(express.json());

app.get("/", (req, res) => {
	res.send("API");
});

app.use("/api/auth", auth.router);
app.use("/api/articles", articles.router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

const express = require("express");
const { v1: uuidv1 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const TOKEN_SALT = "SECRET_TOKEN_SALT";

const users = [
	{
		id: "3feec290-29ee-11ec-93dd-3dd487ac1234",
		username: "admin@gmail.com",
		password:
			"$2b$10$t2L6Js39Zhv7Y9vHf3iSieqTdHiBJ2NiHgwHLECr.TAj3vKpFYiP.", // 123
	},
	{
		id: "3feec290-29ee-11ec-93dd-3dd487ac5678",
		username: "john@yahoo.com",
		password:
			"$2b$10$Kw95Mhim7zve1zksGjG/.OygmeooUtMiVOD/89R94Vg9XcDD3EmR.", // 111
	},
	{
		id: "3feec290-29ee-11ec-93dd-3dd487ac8901",
		username: "doe@hotmail.com",
		password:
			"$2b$10$.i7q72YZFN4tu0vnGwg/PeMAV182yqiCltIf44G6CkD.F1ChqrKM6", // 222
	},
];

// Validate username and password
const authValidate = [
	check("username", "Username must be an email address")
		.isEmail()
		.trim()
		.escape()
		.normalizeEmail(),
	check("password")
		.isLength({ min: 3 })
		.withMessage("Password must be at least 3 characters")
		.trim()
		.escape(),
];

// Create user
router.post("/register", authValidate, (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).send({ errors: errors.array() });

	const user = {
		id: uuidv1(),
		username: req.body.username,
		password: generateHashPassword(req.body.password),
	};

	users.push(user);

	res.send(user);
});

// Authenticate user
router.post("/login", authValidate, (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).send({ errors: errors.array() });

	const user = users.find((u) => u.username === req.body.username);

	if (!user) return res.status(400).send("Username or Password invalid");

	const isPasswordCorrect = bcrypt.compareSync(
		req.body.password,
		user.password
	);

	if (!isPasswordCorrect)
		return res.status(400).send("Username or Password invalid");

	const payload = { id: user.id };
	const token = jwt.encode(payload, TOKEN_SALT);

	res.send({
		id: user.id,
		username: user.username,
		token,
	});
});

function generateHashPassword(rawPassword) {
	const salt = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(rawPassword, salt);
}

function checkAuthenticated(req, res, next) {
	if (!req.header("authorization"))
		return res.status(401).send("Unauthorized. Missing Auth header.");

	const token = req.header("authorization").split(" ")[1];
	const payload = jwt.decode(token, TOKEN_SALT);

	if (!payload)
		return res.status(401).send("Unathorized. Auth Header Invalid");

	res.userId = payload.id;

	next();
}

const authRoute = {
	router,
	checkAuthenticated,
};

module.exports = authRoute;

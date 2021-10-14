const express = require("express");
const { v1: uuidv1 } = require("uuid");
const { check, validationResult } = require("express-validator");
const auth = require("./auth.js");
const slugify = require("slugify");
const router = express.Router();

const articles = [
	{
		id: "3feec290-29ee-11ec-93dd-3dd487acfc8a",
		slug: "10-signs-that-you-are-writing-bad-code-3feec290-29ee-11ec-93dd-3dd487acfc8a",
		userName: "admin",
		userId: "3feec290-29ee-11ec-93dd-3dd487ac1234",
		title: "10 Signs That You Are Writing Bad code",
		body: "If you are a programmer, I am sure you use something like Github to store your code. Just look at the old code you wrote a year ago or more. I am sure you will be surprised by how much you have improved between now and the time you wrote the code.",
	},
	{
		id: "4b637fd0-29ee-11ec-93dd-3dd487acfc8a",
		slug: "7-quotes-abouts-programming-youll-kick-yourself-for-not-knowing-4b637fd0-29ee-11ec-93dd-3dd487acfc8a",
		userName: "admin",
		userId: "3feec290-29ee-11ec-93dd-3dd487ac1234",
		title: "7 Quotes Abouts Programming, You’ll kick yourself for Not knowing",
		body: "Quotes are really powerful and can make you determined. And they can also make you euphoric. Whenever I read quotes, I think, how is it that they wrote this amazing little piece with these huge powerful words.",
	},
	{
		id: "5de92b00-29ee-11ec-93dd-3dd487acfc8a",
		slug: "postgresql-with-fake-data-5de92b00-29ee-11ec-93dd-3dd487acfc8a",
		userName: "admin",
		userId: "3feec290-29ee-11ec-93dd-3dd487ac1234",
		title: "PostgreSQL with Fake Data (:",
		body: "All developers at this time are looking for an easy way to launch their application. However, creating a large group manually could be tedious and time wasting. With PostgreSQL it’s easy to create a test dataset that links randomly generated values using a few simple commands.",
	},
	{
		id: "63f6d9c0-29ee-11ec-93dd-3dd487acfc8a",
		slug: "i-regret-using-php-63f6d9c0-29ee-11ec-93dd-3dd487acfc8a",
		userName: "john",
		userId: "3feec290-29ee-11ec-93dd-3dd487ac1235",
		title: "I regret using PHP",
		body: "Right now, I finished a titanic project (around 3 year in the making) and the project is working as expected. However, it feels so fragile and I think I loss a lot of time in some other tasks rather than the own code (including testing/benchmarking libraries, creating our own libraries).",
	},
	{
		id: "6ced2980-29ee-11ec-93dd-3dd487acfc8a",
		slug: "4-things-to-do-before-writing-code-in-any-project-6ced2980-29ee-11ec-93dd-3dd487acfc8a",
		userName: "doe",
		userId: "3feec290-29ee-11ec-93dd-3dd487ac8901",
		title: "4 Things to do before writing code in any project",
		body: "Churning out code without proper preparation leads to time consuming refactoring sessions later on. This problem gets exacerbated by well intended test driven design when refactoring not only means trashing program code but also trashing good tests.",
	},
];

// // Validate article
const articleValidate = [
	check("userId").notEmpty(),
	check("userName").notEmpty(),
	check("title").notEmpty(),
	check("body").notEmpty(),
];

// Get all articles
router.get("/", (req, res) => {
	if (req.query.userId) {
		return res.send(articles.filter((a) => a.userId === req.query.userId));
	}

	res.send(articles);
});

// Get article details
router.get("/:slug", (req, res) => {
	const article = articles.find((a) => a.slug === req.params.slug);

	if (!article)
		return res
			.status(404)
			.send("The article with the given id was not found.");

	res.send(article);
});

// Create article
router.post("/", auth.checkAuthenticated, articleValidate, (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).send({ errors: errors.array() });

	const articleId = uuidv1();
	const article = {
		id: articleId,
		slug: slugify(req.body.title + "-" + articleId),
		userName: req.body.userName,
		userId: req.body.userId,
		title: req.body.title,
		body: req.body.body,
	};

	articles.push(article);
	res.status(201).send(article);
});

// Update article
router.put("/", auth.checkAuthenticated, articleValidate, (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).send({ errors: errors.array() });

	const article = articles.find((a) => a.id === req.body.id);

	if (!article)
		return res
			.status(404)
			.send("The article with the given id was not found.");

	article.slug = slugify(req.body.title + "-" + req.body.id);
	article.title = req.body.title;
	article.body = req.body.body;

	res.send(article);
});

// Delete article
router.delete("/:slug", auth.checkAuthenticated, (req, res) => {
	const index = articles.findIndex((a) => a.slug === req.params.slug);

	if (index == -1)
		return res
			.status(404)
			.send("The article with the given id was not found.");

	articles.splice(index, 1);

	res.send(req.params.slug);
});

const articlesRoute = {
	router,
};

module.exports = articlesRoute;

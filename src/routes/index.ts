import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
	res.render("index");
});

router.get("/join", (_req, res) => {
	res.render("join");
});

router.get("/new-message", (_req, res) => {
	res.render("new-message");
});

router.get("/login", (_req, res) => {
	res.render("login");
});

router.get("/signup", (_req, res) => {
	res.render("signup");
});

export default router;

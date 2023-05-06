import express from "express";

const router = express.Router();

router.get("/logout", (req, res, next) => {
	req.logout((err) => {
		if (err) return next(err);
		res.redirect("/");
	});
});

router.get("/", (req, res) => {
	console.log(req.user);
	res.render("index", { user: req.user });
});

export default router;

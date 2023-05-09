import express from "express";
import {
	deleteMessage,
	getMessages,
	postNewMessage,
} from "../controllers/messageController";

const router = express.Router();

router.get("/logout", (req, res, next) => {
	req.logout((err) => {
		if (err) return next(err);
		res.redirect("/");
	});
});

router.get("/", async (req, res) => {
	if (!req.user) return res.render("index");

	const messages = await getMessages();
	res.render("index", { user: req.user, messages });
});

router.post("/new-message", postNewMessage);

router.post("/delete-message/:id", deleteMessage);

export default router;

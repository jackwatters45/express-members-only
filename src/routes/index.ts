import express from "express";
import {
	getJoinClub,
	getLogin,
	getSignUp,
	postJoinClub,
	postLogin,
	postSignUp,
} from "../controllers/userController";
import {
	getNewMessage,
	postNewMessage,
} from "../controllers/messageController";

const router = express.Router();

router.get("/", (_req, res) => {
	res.render("index");
});

router.get("/signup", getSignUp);

router.post("/signup", postSignUp);

router.get("/login", getLogin);

router.post("/login", postLogin);

router.get("/join", getJoinClub);

router.post("/join", postJoinClub);

router.get("/new-message", getNewMessage);

router.post("/new-message", postNewMessage);

export default router;

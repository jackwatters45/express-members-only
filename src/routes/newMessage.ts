import express from "express";
import {
	getNewMessage,
	postNewMessage,
} from "../controllers/messageController";

const router = express.Router();

router.get("/", getNewMessage);

router.post("/", postNewMessage);

export default router;

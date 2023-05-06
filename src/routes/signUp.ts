import express from "express";
import { getSignUp, postSignUp } from "../controllers/userController";

const router = express.Router();

router.get("/", getSignUp);

router.post("/", postSignUp);

export default router;

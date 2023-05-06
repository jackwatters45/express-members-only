import express from "express";
import { getLogin, postLogin } from "../controllers/userController";

const router = express.Router();

router.get("/", getLogin);

router.post("/", postLogin);

export default router;

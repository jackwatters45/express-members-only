import express from "express";
import { getJoinClub, postJoinClub } from "../controllers/userController";

const router = express.Router();

router.get("/", getJoinClub);

router.post("/", postJoinClub);

export default router;

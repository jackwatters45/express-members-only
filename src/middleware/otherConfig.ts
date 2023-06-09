import express, { Application } from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";

const configOtherMiddleware = (app: Application) => {
	app.use(logger("dev"));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser(process.env.SESSION_SECRET as string));
};

export default configOtherMiddleware;

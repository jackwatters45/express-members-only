import express, { Application } from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";

const configOtherMiddleware = (app: Application) => {
	app.use(logger("dev"));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
};

export default configOtherMiddleware;

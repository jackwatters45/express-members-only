/* eslint-disable @typescript-eslint/no-unused-vars */
import createError from "http-errors";
import express, { Request, Response } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import compression from "compression";
import helmet from "helmet";
import RateLimit from "express-rate-limit";
import indexRouter from "./routes/index";
import configDb from "./config/database";

dotenv.config();

const app = express();

//  mongoose set up
configDb();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// app.use(compression()); // Compress all routes
// // Add helmet to the middleware chain.
// // Set CSP headers to allow our Bootstrap and Jquery to be served
// app.use(
// 	helmet.contentSecurityPolicy({
// 		directives: {
// 			"script-src": ["self", "code.jquery.com", "cdn.jsdelivr.net"],
// 			"img-src": ["'self'", "https: data: blob:"],
// 		},
// 	}),
// );

// // Set up rate limiter: maximum of twenty requests per minute
// const limiter = RateLimit({
// 	windowMs: 1 * 60 * 1000, // 1 minute
// 	max: 20,
// });
// // Apply rate limiter to all requests
// app.use(limiter);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

//
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
	next(createError(404));
});

// error handler
interface Error {
	status?: number;
	message?: string;
}

app.use((err: Error, req: Request, res: Response) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

const port = process.env.PORT || 5173;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

export default app;

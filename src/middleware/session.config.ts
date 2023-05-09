import { Application } from "express";
import session from "express-session";

const configSession = (app: Application) => {
	app.use(
		session({
			secret: process.env.SESSION_SECRET as string,
			resave: false,
			saveUninitialized: true,
			cookie: { maxAge: 1000 * 60 * 60 },
		}),
	);
};

export default configSession;

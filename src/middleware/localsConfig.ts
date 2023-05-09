import { Request, Response, NextFunction, Application } from "express";

const configLocals = (app: Application) => {
	app.use(function (req: Request, res: Response, next: NextFunction) {
		res.locals.currentUser = req.user;
		next();
	});
};

export default configLocals;

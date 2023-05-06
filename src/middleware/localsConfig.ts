import { Request, Response, NextFunction, Application } from "express";

const configLocals = (app: Application) => {
	app.use(function (req: Request, res: Response, next: NextFunction) {
		res.locals.currentUser = req.user;

		next();
	});

	// error handler
	// TODO meep
	// interface Error {
	// 	status?: number;
	// 	message?: string;
	// }

	// app.use((err: Error, req: Request, res: Response) => {
	// 	// set locals, only providing error in development
	// 	res.locals.message = err.message;
	// 	res.locals.error = req.app.get("env") === "development" ? err : {};

	// 	// render the error page
	// 	res.status(err.status || 500);
	// 	res.render("error");
	// });
};

export default configLocals;

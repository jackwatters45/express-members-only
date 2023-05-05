import passport from "passport";
import passportLocal from "passport-local";
import express, { Request, Response, NextFunction, Application } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";

const LocalStrategy = passportLocal.Strategy;

const configPassport = (app: Application) => {
	passport.use(
		new LocalStrategy(async (username, password, done) => {
			try {
				const user = await User.findOne({ username: username });
				if (!user) {
					return done(null, false, { message: "Incorrect username" });
				}
				bcrypt.compare(password, user.password, (err, res) => {
					if (res) {
						// passwords match! log user in
						return done(null, user);
					} else {
						// passwords do not match!
						return done(null, false, { message: "Incorrect password" });
					}
				});
			} catch (err) {
				return done(err);
			}
		}),
	);

	// TODO may fuck up
	type User = {
		_id?: number;
	};

	passport.serializeUser((user: User, done) => {
		done(null, user._id);
	});

	passport.deserializeUser(async function (id, done) {
		try {
			const user = await User.findById(id);
			done(null, user);
		} catch (err) {
			done(err);
		}
	});

	app.use(passport.initialize());
	app.use(passport.session());
	app.use(express.urlencoded({ extended: false }));

	app.use(function (req: Request, res: Response, next: NextFunction) {
		res.locals.currentUser = req.user;
		next();
	});
};

export default configPassport;

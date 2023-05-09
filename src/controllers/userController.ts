/* eslint-disable @typescript-eslint/no-explicit-any */
import expressAsyncHandler from "express-async-handler";
import { Request, Response, NextFunction, User as UserModel } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import User from "../models/user";
import passport from "passport";

// @desc    Get sign up page
// @route   GET /signup
// @access  Public
export const getSignUp = (_req: Request, res: Response) => {
	res.render("signup");
};

// @desc    Register a new user
// @route   POST /signup
// @access  Public
export const postSignUp = [
	body("firstName").notEmpty().trim(),
	body("lastName").notEmpty().trim(),
	body("email").notEmpty().trim().isEmail().normalizeEmail(),
	body("username").notEmpty().trim(),
	body("password").notEmpty().trim(),
	body("confirmPassword")
		.notEmpty()
		.trim()
		.custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error("Passwords do not match");
			}
			return true;
		}),
	expressAsyncHandler(
		async (req: Request, res: Response, next: NextFunction): Promise<any> => {
			try {
				const errors = validationResult(req);
				if (!errors.isEmpty()) {
					return res.status(422).json({ errors: errors.array() });
				}

				const { firstName, lastName, email, username } = req.body;

				const hashedPassword = await bcrypt.hash(req.body.password, 10);
				const user = new User({
					firstName,
					lastName,
					password: hashedPassword,
					email,
					username,
					membershipStatus: "user",
				});
				const result = await user.save();
				if (!result) throw new Error("Could not save user");

				req.logIn(user, function (err) {
					if (err) return next(err);

					return res.redirect("/");
				});
			} catch (err) {
				return next(err);
			}
		},
	),
];

// @desc    Get login page
// @route   GET /login
// @access  Public
export const getLogin = (_req: Request, res: Response) => {
	res.render("login");
};

// @desc    Log in a user
// @route   POST /login
// @access  Public
export const postLogin = [
	body("username").notEmpty().trim(),
	body("password").notEmpty().trim(),
	expressAsyncHandler(
		async (req: Request, res: Response, next: NextFunction): Promise<any> => {
			const errors = validationResult(req);

			if (!errors.isEmpty())
				return res.status(422).json({ errors: errors.array() });

			passport.authenticate("local", function (err: Error, user: UserModel) {
				if (err) return next(err);

				if (!user)
					return res.status(401).json({ message: "Invalid email or password" });

				req.logIn(user, function (err) {
					if (err) return next(err);

					return res.redirect("/");
				});
			})(req, res, next);
		},
	),
];

// @desc    get join club page
// @route   GET /join
// @access  Public
export const getJoinClub = (_req: Request, res: Response) => {
	res.render("join");
};

// @desc    enter code to join the club
// @route   POST /join
// @access  Public
export const postJoinClub = [
	body("code").notEmpty().trim().blacklist("."),
	expressAsyncHandler(async (req: Request, res: Response): Promise<any> => {
		const errors = validationResult(req);

		if (!errors.isEmpty())
			return res.status(422).json({ errors: errors.array() });

		const { code } = req.body;

		const user = req.user as UserModel;
		if (code.toLowerCase() === process.env.CLUB_CODE) {
			user.membershipStatus = "superuser";
			await user.save();
			return res.redirect("/");
		}

		if (code.toLowerCase() !== process.env.ADMIN_CODE) {
			user.membershipStatus = "admin";
			await user.save();
			return res.redirect("/");
		}

		return res.status(401).json({ message: "Invalid code" });
	}),
];

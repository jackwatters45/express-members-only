/* eslint-disable @typescript-eslint/no-unused-vars */
import expressAsyncHandler from "express-async-handler";
import { body, validationResult, check } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";

// @desc    Get sign up page
// @route   GET /signup
// @access  Public
export const getSignUp = expressAsyncHandler(async (_req, res) => {
	res.render("signup");
});

// @desc    Register a new user
// @route   POST /signup
// @access  Public
export const postSignUp = expressAsyncHandler(async (req, res, next) => {
	// TODO
	const errors = validationResult(req);

	bcrypt.hash("somePassword", 10, async (err, hashedPassword) => {
		// if err, do something
		if (err) return next(err);
		// otherwise, store hashedPassword in DB
		try {
			const user = new User({
				username: req.body.username,
				password: hashedPassword,
			});
			const result = await user.save();
			res.redirect("/");
		} catch (err) {
			return next(err);
		}
	});
});

// @desc    Get login page
// @route   GET /login
// @access  Public
export const getLogin = expressAsyncHandler(async (_req, res) => {
	res.render("login");
});

// @desc    Log in a user
// @route   POST /login
// @access  Public
export const postLogin = expressAsyncHandler(async (req, res) => {
	// TODO
	const errors = validationResult(req);
});

// @desc    get join club page
// @route   GET /join
// @access  Public
export const getJoinClub = expressAsyncHandler(async (req, res) => {
	res.render("join");
});

// @desc    enter code to join the club
// @route   POST /join
// @access  Public
export const postJoinClub = expressAsyncHandler(async (req, res) => {
	// TODO
	const errors = validationResult(req);
});

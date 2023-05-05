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
export const postSignUp = expressAsyncHandler(async (req, res) => {
	// TODO
	const errors = validationResult(req);
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

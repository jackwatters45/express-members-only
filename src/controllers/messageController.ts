/* eslint-disable @typescript-eslint/no-unused-vars */
import expressAsyncHandler from "express-async-handler";
import { body, validationResult, check } from "express-validator";

// @desc    get new message page
// @route   GET /new-message
// @access  Public
export const getNewMessage = expressAsyncHandler(async (req, res) => {
	res.render("new-message");
});

// @desc    post new message
// @route   POST /new-message
// @access  Public
export const postNewMessage = expressAsyncHandler(async (req, res) => {
	// TODO
	const errors = validationResult(req);
});

/* eslint-disable @typescript-eslint/no-explicit-any */
import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import Message from "../models/message";
import { IUser } from "../models/user";

// @desc    Get messages
export const getMessages = async () => {
	return await Message.find().populate("user").sort({ timestamp: 1 }).exec();
};

// @desc    post new message
// @route   POST /new-message
// @access  Public
export const postNewMessage = [
	body("message").notEmpty().trim(),
	expressAsyncHandler(async (req, res, next): Promise<any> => {
		const errors = validationResult(req);

		if (!errors.isEmpty())
			return res.status(422).json({ errors: errors.array() });

		const user = req.user as IUser;
		const message = new Message({
			user: user._id,
			content: req.body.message,
			timestamp: new Date(),
		});

		const result = await message.save();
		if (!result) return next(new Error("Could not save message"));

		return res.redirect("/");
	}),
];

// @desc    Delete message
// @route   DELETE /delete-message/:id
// @access  Public
export const deleteMessage = expressAsyncHandler(
	async (req, res, next): Promise<any> => {
		const { id } = req.params;

		const result = await Message.findByIdAndDelete(id);
		if (!result) return next(new Error("Could not delete message"));

		return res.redirect("/");
	},
);

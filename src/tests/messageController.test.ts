import request from "supertest";
import express from "express";
import {
	getMessages,
	postNewMessage,
	deleteMessage,
} from "../controllers/messageController";
import Message from "../models/message";
import mongoose from "mongoose";

jest.mock("../models/message");

const user = {
	_id: new mongoose.Types.ObjectId(),
	username: "test",
	firstName: "first",
	lastName: "last",
	email: "test@test.com",
	password: "password",
	membershipStatus: "member",
};

const app = express();
app.use(express.json());
app.get("/messages", getMessages);
app.post("/new-message", postNewMessage);
app.delete("/delete-message/:id", deleteMessage);

describe("Message Controller", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	test("getMessages should return messages", async () => {
		const mockMessages = [
			{
				_id: "1",
				user: user,
				content: "Hello",
				timestamp: new Date(),
			},
		];

		(Message.find as jest.Mock).mockResolvedValueOnce(mockMessages);

		const response = await request(app).get("/");
		expect(response.status).toBe(200);
		expect(response.body).toEqual(mockMessages);
	});

	test("postNewMessage should create a new message", async () => {
		const messageContent = "Test message";

		(Message.prototype.save as jest.Mock).mockResolvedValueOnce({
			_id: "1",
			user: user._id,
			content: messageContent,
			timestamp: new Date(),
		});

		const response = await request(app)
			.post("/new-message")
			.send({ message: messageContent });

		expect(response.status).toBe(302);
		expect(Message.prototype.save).toHaveBeenCalled();
	});

	test("deleteMessage should delete a message", async () => {
		const messageId = "1";

		(Message.findByIdAndDelete as jest.Mock).mockResolvedValueOnce({
			_id: messageId,
			user: user._id,
			content: "Hello",
			timestamp: new Date(),
		});

		const response = await request(app).delete(`/delete-message/${messageId}`);
		expect(response.status).toBe(302);
		expect(Message.findByIdAndDelete).toHaveBeenCalledWith(messageId);
	});
});

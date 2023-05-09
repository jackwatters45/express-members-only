import request from "supertest";
import express from "express";
import {
	getSignUp,
	postSignUp,
	getLogin,
	postLogin,
	getJoinClub,
	postJoinClub,
} from "../controllers/userController";
import passportStub from "passport-stub";
import User from "../models/user";

jest.mock("../models/user");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
passportStub.install(app);
app.get("/signup", getSignUp);
app.post("/signup", postSignUp);
app.get("/login", getLogin);
app.post("/login", postLogin);
app.get("/join", getJoinClub);
app.post("/join", postJoinClub);

describe("User Controller", () => {
	afterEach(() => {
		jest.resetAllMocks();
		passportStub.logout();
	});

	test("getSignUp should return the sign-up page", async () => {
		const response = await request(app).get("/signup");
		expect(response.status).toBe(200);
	});

	test("postSignUp should create a new user", async () => {
		const newUser = {
			firstName: "John",
			lastName: "Doe",
			email: "john.doe@example.com",
			username: "john.doe",
			password: "password",
		};

		(User.prototype.save as jest.Mock).mockResolvedValueOnce(newUser);

		const response = await request(app)
			.post("/signup")
			.send({ ...newUser, confirmPassword: newUser.password });

		expect(response.status).toBe(302);
		expect(User.prototype.save).toHaveBeenCalled();
	});

	test("getLogin should return the login page", async () => {
		const response = await request(app).get("/login");
		expect(response.status).toBe(200);
	});

	test("postLogin should log in a user", async () => {
		const user = {
			_id: "1",
			username: "john.doe",
			password: "password",
		};

		(User.findOne as jest.Mock).mockResolvedValueOnce(user);
		passportStub.login(user);

		const response = await request(app)
			.post("/login")
			.send({ username: user.username, password: user.password });

		expect(response.status).toBe(302);
		expect(passportStub.isAuthenticated()).toBe(true);
	});

	test("getJoinClub should return the join club page", async () => {
		const response = await request(app).get("/join");
		expect(response.status).toBe(200);
	});

	test("postJoinClub should update user's membership status", async () => {
		const user = {
			_id: "1",
			username: "john.doe",
			membershipStatus: "user",
			save: jest.fn().mockResolvedValueOnce(true),
		};

		passportStub.login(user);
		(User.findById as jest.Mock).mockResolvedValueOnce(user);

		const response = await request(app)
			.post("/join")
			.send({ code: process.env.CLUB_CODE });

		expect(response.status).toBe(302);
		expect(user.save).toHaveBeenCalled();
	});
});

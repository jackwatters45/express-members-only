"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postJoinClub = exports.getJoinClub = exports.postLogin = exports.getLogin = exports.postSignUp = exports.getSignUp = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const passport_1 = __importDefault(require("passport"));
const getSignUp = (_req, res) => {
    res.render("signup");
};
exports.getSignUp = getSignUp;
exports.postSignUp = [
    (0, express_validator_1.body)("firstName").notEmpty().trim(),
    (0, express_validator_1.body)("lastName").notEmpty().trim(),
    (0, express_validator_1.body)("email").notEmpty().trim().isEmail().normalizeEmail(),
    (0, express_validator_1.body)("username").notEmpty().trim(),
    (0, express_validator_1.body)("password").notEmpty().trim(),
    (0, express_validator_1.body)("confirmPassword")
        .notEmpty()
        .trim()
        .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match");
        }
        return true;
    }),
    (0, express_async_handler_1.default)(async (req, res, next) => {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty())
                return res.render("signup", { errors: errors.array() });
            const { firstName, lastName, email, username } = req.body;
            const hashedPassword = await bcryptjs_1.default.hash(req.body.password, 10);
            const user = new user_1.default({
                firstName,
                lastName,
                password: hashedPassword,
                email,
                username,
                membershipStatus: "user",
            });
            const result = await user.save();
            if (!result)
                throw new Error("Could not save user");
            req.logIn(user, function (err) {
                if (err)
                    return next(err);
                return res.redirect("/");
            });
        }
        catch (err) {
            return next(err);
        }
    }),
];
const getLogin = (_req, res) => {
    res.render("login");
};
exports.getLogin = getLogin;
exports.postLogin = [
    (0, express_validator_1.body)("username").notEmpty().trim(),
    (0, express_validator_1.body)("password").notEmpty().trim(),
    (0, express_async_handler_1.default)(async (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.render("login", { errors: errors.array() });
        passport_1.default.authenticate("local", function (err, user) {
            if (err)
                return next(err);
            if (!user)
                return res.render("login", {
                    errors: [{ msg: "Invalid email or password" }],
                });
            req.logIn(user, function (err) {
                if (err)
                    return next(err);
                return res.redirect("/");
            });
        })(req, res, next);
    }),
];
const getJoinClub = (_req, res) => {
    res.render("join");
};
exports.getJoinClub = getJoinClub;
exports.postJoinClub = [
    (0, express_validator_1.body)("code").notEmpty().trim().blacklist("."),
    (0, express_async_handler_1.default)(async (req, res) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.render("join", { errors: errors.array() });
        const { code } = req.body;
        const user = req.user;
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
        return res.render("join", { errors: [{ msg: "Invalid code" }] });
    }),
];
//# sourceMappingURL=userController.js.map
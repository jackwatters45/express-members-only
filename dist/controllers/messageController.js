"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.postNewMessage = exports.getMessages = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const express_validator_1 = require("express-validator");
const message_1 = __importDefault(require("../models/message"));
const getMessages = async () => {
    return await message_1.default.find().populate("user").sort({ timestamp: 1 }).exec();
};
exports.getMessages = getMessages;
exports.postNewMessage = [
    (0, express_validator_1.body)("message").notEmpty().trim(),
    (0, express_async_handler_1.default)(async (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.render("index", { errors: errors.array() });
        const user = req.user;
        const message = new message_1.default({
            user: user._id,
            content: req.body.message,
            timestamp: new Date(),
        });
        const result = await message.save();
        if (!result)
            return next(new Error("Could not save message"));
        return res.redirect("/");
    }),
];
exports.deleteMessage = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const result = await message_1.default.findByIdAndDelete(id);
    if (!result)
        return next(new Error("Could not delete message"));
    return res.redirect("/");
});
//# sourceMappingURL=messageController.js.map
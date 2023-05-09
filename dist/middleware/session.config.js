"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const configSession = (app) => {
    app.use((0, express_session_1.default)({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 },
    }));
};
exports.default = configSession;
//# sourceMappingURL=session.config.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const LocalStrategy = passport_local_1.default.Strategy;
const configPassport = (app) => {
    passport_1.default.use(new LocalStrategy(async (username, password, done) => {
        try {
            const user = await user_1.default.findOne({ email: username }).exec();
            if (!user)
                return done(null, false, { message: "Incorrect email" });
            const match = await bcryptjs_1.default.compare(password, user.password);
            if (match)
                return done(null, user);
            return done(null, false, { message: "Incorrect password" });
        }
        catch (err) {
            return done(err);
        }
    }));
    passport_1.default.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport_1.default.deserializeUser(async function (id, done) {
        try {
            const user = await user_1.default.findById(id);
            done(null, user);
        }
        catch (err) {
            done(err);
        }
    });
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
};
exports.default = configPassport;
//# sourceMappingURL=passportConfig.js.map
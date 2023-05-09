"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: { type: String, required: true },
    membershipStatus: { type: String, required: true },
    messages: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Message" }],
    admin: { type: Boolean, default: false },
});
UserSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
});
exports.default = (0, mongoose_1.model)("User", UserSchema);
//# sourceMappingURL=user.js.map
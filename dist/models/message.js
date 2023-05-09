"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MessageSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, required: true },
    timestamp: { type: Date, required: true },
});
exports.default = (0, mongoose_1.model)("Message", MessageSchema);
//# sourceMappingURL=message.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_1 = require("../controllers/messageController");
const router = express_1.default.Router();
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err)
            return next(err);
        res.redirect("/");
    });
});
router.get("/", async (req, res) => {
    if (!req.user)
        return res.render("index");
    const messages = await (0, messageController_1.getMessages)();
    res.render("index", { user: req.user, messages });
});
router.post("/new-message", messageController_1.postNewMessage);
router.post("/delete-message/:id", messageController_1.deleteMessage);
exports.default = router;
//# sourceMappingURL=index.js.map
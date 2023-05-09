"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./routes/index"));
const signUp_1 = __importDefault(require("./routes/signUp"));
const login_1 = __importDefault(require("./routes/login"));
const join_1 = __importDefault(require("./routes/join"));
const database_1 = __importDefault(require("./config/database"));
const session_config_1 = __importDefault(require("./middleware/session.config"));
const passportConfig_1 = __importDefault(require("./middleware/passportConfig"));
const prodConfig_1 = __importDefault(require("./middleware/prodConfig"));
const otherConfig_1 = __importDefault(require("./middleware/otherConfig"));
const localsConfig_1 = __importDefault(require("./middleware/localsConfig"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, session_config_1.default)(app);
(0, passportConfig_1.default)(app);
(0, database_1.default)();
(0, localsConfig_1.default)(app);
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
(0, otherConfig_1.default)(app);
(0, prodConfig_1.default)(app);
app.use("/signup", signUp_1.default);
app.use("/login", login_1.default);
app.use("/join", join_1.default);
app.use("/", index_1.default);
app.use((req, _res, next) => {
    next((0, http_errors_1.default)(404));
});
app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.render("error");
});
const port = process.env.PORT || "0.0.0.0";
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map
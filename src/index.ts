import createError from "http-errors";
import express from "express";
import dotenv from "dotenv";
import indexRouter from "./routes/index";
import signupRouter from "./routes/signUp";
import loginRouter from "./routes/login";
import joinRouter from "./routes/join";
import newMessageRouter from "./routes/newMessage";
import configDb from "./config/database";
import configSession from "./middleware/session.config";
import configPassport from "./middleware/passportConfig";
import configProdMiddleware from "./middleware/prodConfig";
import configOtherMiddleware from "./middleware/otherConfig";
import configLocals from "./middleware/localsConfig";
import path from "path";

dotenv.config();

const app = express();

// session + passport set up
configSession(app);
configPassport(app);

//  mongoose set up
configDb();

// set up locals
configLocals(app);

// view engine setup + static files
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

// set up other middleware
configOtherMiddleware(app);

// TODO uncomment for production
// configProdMiddleware(app);

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/join", joinRouter);
app.use("/new-message", newMessageRouter);

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use((req, _res, next) => {
	next(createError(404));
});

const port = process.env.PORT || 5173;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

export default app;

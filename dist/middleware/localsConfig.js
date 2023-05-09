"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configLocals = (app) => {
    app.use(function (req, res, next) {
        res.locals.currentUser = req.user;
        next();
    });
};
exports.default = configLocals;
//# sourceMappingURL=localsConfig.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const port = 3000;
// Add routes
app.use(routes_1.default);
app.listen(port, function () {
    const url = `\x1b[2mhttp://localhost:${port}\x1b[0m`;
    console.log(`Please open ${url} to review the project ...`);
});
exports.default = app;

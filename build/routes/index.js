"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utilities_1 = require("../utilities");
const routes = express_1.default.Router();
routes.use(express_1.default.static("public"));
routes.get("/images", utilities_1.imageHandler);
exports.default = routes;

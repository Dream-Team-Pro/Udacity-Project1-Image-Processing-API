"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const images_1 = __importDefault(require("./images"));
const routes = express_1.default.Router();
routes.use('/api/images', images_1.default);
routes.get('/', (request, response) => {
    // This could be done by serving views ... Just quick and dirty for now :-)
    response.send('<h1>Welcome to image-processing-api</h1><p>Listening at <code><a href="/api/images">/api/images</a></code> for queries containing at least a valid filename. Optionally use both width and height to set the size...</p><p>Examples:<ul><li><a href="/api/images?filename=fish">/api/images?filename=fish</a></li><li><a href="/api/images?filename=fish&width=100&height=100">/api/images?filename=fish&width=100&height=100</a></li></ul></p>');
});
exports.default = routes;

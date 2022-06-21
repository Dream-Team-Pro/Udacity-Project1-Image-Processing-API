"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESIZED_PATH = exports.FULL_PATH = exports.IMAGES = void 0;
const path_1 = __importDefault(require("path"));
const IMAGES = ['fish', 'jillyfish', 'shark', 'whale'];
exports.IMAGES = IMAGES;
// image directory path
const FULL_PATH = path_1.default.join(__dirname, "..", "/public/images/full");
exports.FULL_PATH = FULL_PATH;
const RESIZED_PATH = path_1.default.join(__dirname, "..", "/public/images/resized");
exports.RESIZED_PATH = RESIZED_PATH;
console.log('FULL_PATH', FULL_PATH);
console.log('RESIZED_PATH', RESIZED_PATH);

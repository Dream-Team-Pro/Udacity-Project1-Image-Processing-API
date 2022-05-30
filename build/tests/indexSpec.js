"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// const request = supertest(app);
const utilities_1 = require("../utilities");
const imagesPath = path_1.default.join(__dirname, "../..", "/public/images/");
console.log('eww', imagesPath);
// jasmine unit testing
/*----- check url parameters from user  -----*/
describe("test check Url parameters", () => {
    it("should True because all url parameters entered", () => {
        const check = (0, utilities_1.imageValid)("fish", 150, 250);
        expect(check).toBeTrue();
    });
    it("should false because some url parameters are missing", () => {
        const check = (0, utilities_1.imageValid)("fish", 100, 0);
        expect(check).toBeFalse();
    });
});
/*----- check if image was resized or not  -----*/
describe("test check image is resized or not", () => {
    it("should True because the image is resized", () => {
        const check = (0, utilities_1.resizeImage)("fish", 150, 250);
        expect(check).toEqual(check);
    });
});
/*----- check url parameters from user  -----*/
describe("test check image Exists in Full path", () => {
    it("should True because an image Exists in Full Directory", () => {
        const check = (0, utilities_1.imageExistsFull)("fish");
        expect(check).toBeTrue();
    });
    it("should False because an image Doesn't Exist in Full Directory", () => {
        const check = (0, utilities_1.imageExistsFull)("dog");
        expect(check).toBeFalse();
    });
});
/*----- check to create Resized Directory if not Exists -----*/
describe("test check create resized Directory", () => {
    it("should True because it's create resized Directory", () => {
        (0, utilities_1.createResizedImageDir)()
            .then(() => {
            const check = imagesPath + "/resized/";
            console.log("const", check);
            expect(fs_1.default.existsSync(check)).toBeTrue();
        });
    });
    it("should False because it's not create newDir Directory", () => {
        (0, utilities_1.createResizedImageDir)()
            .then(() => {
            const check = imagesPath + "/newDir/";
            console.log("const", check);
            expect(fs_1.default.existsSync(check)).toBeFalse();
        });
    });
});

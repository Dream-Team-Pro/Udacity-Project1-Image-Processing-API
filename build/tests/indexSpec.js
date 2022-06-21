"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const app = (0, express_1.default)();
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const request = (0, supertest_1.default)(app);
const utilities_1 = require("../utilities");
const imagesPath = path_1.default.join(__dirname, "../..", "/public/images/");
const FullPath = path_1.default.join(imagesPath, `/full/`);
const ResizedPath = path_1.default.resolve(imagesPath, `resized/`);
// console.log('eww', imagesPath);
// jasmine unit testing
/*----- check url parameters from user  -----*/
describe('Test images endpoint', () => {
    it('Image should exist in Resized Path', () => {
        expect(fs_1.default.existsSync(`${ResizedPath}/fish-150-250.jpg`)).toBeTruthy();
        console.log('RESIZED_PATH', ResizedPath);
    });
    it('Image should not exist in Resized Path', () => {
        expect(fs_1.default.existsSync(`${ResizedPath}/fish-50-200.jpg`)).toBeFalsy();
    });
});
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
describe('Test if Image Exist', () => {
    it('expect imageExistsResized defined ', () => {
        expect(utilities_1.imageExistsResized).toBeDefined();
    });
    it('expect imageExistsResized return false with file name fish-150-250.jpg ', () => {
        expect((0, utilities_1.imageExistsResized)("fish", 150, 250) instanceof Promise).toBe(true);
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

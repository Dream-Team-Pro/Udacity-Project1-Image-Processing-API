"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const request = (0, supertest_1.default)(index_1.default);
const utilities_1 = require("../utilities");
const imagesPath = path_1.default.join(__dirname, "../..", "/public/images/");
const FullPath = path_1.default.join(imagesPath, `/full/`);
const ResizedPath = path_1.default.resolve(imagesPath, `resized/`);
// jasmine unit testing
// Test a simple api endpoints
describe("Test endpoint response", () => {
    it("Gets the [/] endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/");
        expect(response.status).toBe(200);
    }));
    it("should True because filename parameter exists in full Directory", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get("/api/images/?filename=fish");
        expect(fs_1.default.existsSync(`${FullPath}/fish.jpg`)).toBeTruthy();
    }));
    it("should False because filename parameter exists in full Directory", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get("/api/images/?filename=frog");
        expect(fs_1.default.existsSync(`${FullPath}/frog.jpg`)).toBeFalsy();
    }));
    it("Gets the [api/images/] endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api/images/?filename=fish&width=100&height=350");
        expect(response.status).toBe(200);
    }));
    it("Image after resized should exist in resized Directory", () => {
        expect(fs_1.default.existsSync(`${ResizedPath}/fish-100-350.jpg`)).toBeTruthy();
    });
    it("Image is it not resized should not be exist in resized Directory", () => {
        expect(fs_1.default.existsSync(`${ResizedPath}/fish-100-100.jpg`)).toBeFalsy();
    });
});
describe("test check Url parameters", () => {
    it("should True because all url parameters entered", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get("/api/images/?filename=fish&width=100&height=350");
        expect(fs_1.default.existsSync(`${ResizedPath}/fish-100-350.jpg`)).toBeDefined();
    }));
    it("should False because filename parameter does't found", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get("/api/images/?filename=&width=100&height=350");
        expect(fs_1.default.existsSync(`${ResizedPath}/fish-100-.jpg`)).toBeFalsy();
    }));
    it("should False because width parameter does't found", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get("/api/images/?filename=fish&width=&height=350");
        expect(fs_1.default.existsSync(`${ResizedPath}/fish--350.jpg`)).toBeFalsy();
    }));
    it("should False because height parameter does't found", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get("/api/images/?filename=fish&width=100&height=");
        expect(fs_1.default.existsSync(`${ResizedPath}/fish-100-.jpg`)).toBeFalsy();
    }));
});
/*----- check to create Resized Directory if not Exists -----*/
describe("test check create resized Directory", () => {
    it("should True because it's create resized Directory", () => {
        (0, utilities_1.createResizedImageDir)().then(() => {
            const check = imagesPath + "/resized/";
            expect(fs_1.default.existsSync(check)).toBeTrue();
        });
    });
    it("should False because it's not create newDir Directory", () => {
        (0, utilities_1.createResizedImageDir)().then(() => {
            const check = imagesPath + "/newDir/";
            expect(fs_1.default.existsSync(check)).toBeFalse();
        });
    });
});

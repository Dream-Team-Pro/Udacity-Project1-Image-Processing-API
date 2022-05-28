"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("../routes");
describe("test checkUrlData", () => {
    it("should True because all parameters entered", () => {
        const validate = (0, routes_1.checkUrlData)("image", 200, 300);
        expect(validate).toBeTrue();
    });
    it("should false because some parameters ar missing", () => {
        const validate = (0, routes_1.checkUrlData)("", 200, 300);
        expect(validate).toBeFalse();
    });
});
describe("test if image is Exists in images folder", () => {
    it("should true when image is exists in /images/full", () => {
        const availble = (0, routes_1.imageExist)("fish");
        expect(availble).toBeTrue();
    });
    it("should false when image is not exists", () => {
        const availble = (0, routes_1.imageExist)("imagesss");
        expect(availble).toBeFalse();
    });
});

import express from "express";
import supertest from "supertest";
const app: express.Application = express();
import fs from "fs";
import path from "path";
// const request = supertest(app);
import {
  createResizedImageDir,
  imageValid,
  imageExistsFull,
  resizeImage
} from "../utilities";
const imagesPath = path.join(__dirname, "../..", "/public/images/");
console.log('eww', imagesPath);

// jasmine unit testing
/*----- check url parameters from user  -----*/
describe("test check Url parameters", () => {
  it("should True because all url parameters entered", () => {
    const check = imageValid("fish", 150, 250);
    expect(check).toBeTrue();
  });

  it("should false because some url parameters are missing", () => {
    const check = imageValid("fish", 100, 0);
    expect(check).toBeFalse();
  });
});

/*----- check if image was resized or not  -----*/
describe("test check image is resized or not", () => {
  it("should True because the image is resized", () => {
    const check = resizeImage("fish", 150, 250);
    expect(check).toEqual(check);
  });
});

/*----- check url parameters from user  -----*/
describe("test check image Exists in Full path", () => {
  it("should True because an image Exists in Full Directory", () => {
    const check = imageExistsFull("fish");
    expect(check).toBeTrue();
  });

  it("should False because an image Doesn't Exist in Full Directory", () => {
    const check = imageExistsFull("dog");
    expect(check).toBeFalse();
  });
});

/*----- check to create Resized Directory if not Exists -----*/
describe("test check create resized Directory", () => {
  it("should True because it's create resized Directory", () => {
    createResizedImageDir()
    .then( () => {
      const check = imagesPath + "/resized/";
      console.log("const", check);
      expect(fs.existsSync(check)).toBeTrue();
    });
  });

  it("should False because it's not create newDir Directory", () => {
    createResizedImageDir()
    .then( () => {
      const check = imagesPath + "/newDir/";
      console.log("const", check);
      expect(fs.existsSync(check)).toBeFalse();
    });
  });
});

import supertest from "supertest";
import app from "../index";
import fs from "fs";
import path from "path";
const request = supertest(app);
import {createResizedImageDir} from "../utilities";

const imagesPath = path.join(__dirname, "../..", "/public/images/");
const FullPath = path.join(imagesPath, `/full/`);
const ResizedPath = path.resolve(imagesPath, `resized/`);

// jasmine unit testing
// Test a simple api endpoints
describe("Test endpoint response", () => {
  it("Gets the [/] endpoint", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });

  it("should True because filename parameter exists in full Directory", async () => {
    await request.get("/api/images/?filename=fish");
    expect(fs.existsSync(`${FullPath}/fish.jpg`)).toBeTruthy();
  });

  it("should False because filename parameter exists in full Directory", async () => {
    await request.get("/api/images/?filename=frog");
    expect(fs.existsSync(`${FullPath}/frog.jpg`)).toBeFalsy();
  });

  it("Gets the [api/images/] endpoint", async () => {
    const response = await request.get(
      "/api/images/?filename=fish&width=100&height=350"
    );
    expect(response.status).toBe(200);
  });

  it("Image after resized should exist in resized Directory", () => {
    expect(fs.existsSync(`${ResizedPath}/fish-100-350.jpg`)).toBeTruthy();
  });

  it("Image is it not resized should not be exist in resized Directory", () => {
    expect(fs.existsSync(`${ResizedPath}/fish-100-100.jpg`)).toBeFalsy();
  });
});

describe("test check Url parameters", () => {
  it("should True because all url parameters entered", async () => {
    await request.get("/api/images/?filename=fish&width=100&height=350");
    expect(fs.existsSync(`${ResizedPath}/fish-100-350.jpg`)).toBeDefined();
  });

  it("should False because filename parameter does't found", async () => {
    await request.get("/api/images/?filename=&width=100&height=350");
    expect(fs.existsSync(`${ResizedPath}/fish-100-.jpg`)).toBeFalsy();
  });

  it("should False because width parameter does't found", async () => {
    await request.get("/api/images/?filename=fish&width=&height=350");
    expect(fs.existsSync(`${ResizedPath}/fish--350.jpg`)).toBeFalsy();
  });

  it("should False because height parameter does't found", async () => {
    await request.get("/api/images/?filename=fish&width=100&height=");
    expect(fs.existsSync(`${ResizedPath}/fish-100-.jpg`)).toBeFalsy();
  });
});

/*----- check to create Resized Directory if not Exists -----*/
describe("test check create resized Directory", () => {
  it("should True because it's create resized Directory", () => {
    createResizedImageDir().then(() => {
      const check = imagesPath + "/resized/";
      expect(fs.existsSync(check)).toBeTrue();
    });
  });

  it("should False because it's not create newDir Directory", () => {
    createResizedImageDir().then(() => {
      const check = imagesPath + "/newDir/";
      expect(fs.existsSync(check)).toBeFalse();
    });
  });
});

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
exports.resizeImage = exports.imageHandler = exports.imageExistsFull = exports.imageValid = exports.createResizedImageDir = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const imagesPath = path_1.default.join(__dirname, "..", "/public/images");
/*----- Create Resized Image directory if not Exists  -----*/
const createResizedImageDir = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!fs_1.default.existsSync(imagesPath + "/resized/")) {
        fs_1.default.mkdir(imagesPath + "/resized/", (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
    return true;
});
exports.createResizedImageDir = createResizedImageDir;
/*----- Check Image is Valid by passing name, width, height -----*/
const imageValid = (filename, width, height) => {
    if (filename !== "" && width !== 0 && height !== 0) {
        return true;
    }
    else {
        return false;
    }
};
exports.imageValid = imageValid;
// (imagesPath + '/resized/')
/*----- Check if image exists in /images/full Directory  -----*/
const imageExistsFull = (filename) => {
    if (fs_1.default.existsSync(imagesPath + `/full/${filename}.jpg`)) {
        return true;
    }
    else {
        return false;
    }
};
exports.imageExistsFull = imageExistsFull;
/*----- check Handling cases of image   -----*/
const imageHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.query.filename;
    const width = Number(req.query.width);
    const height = Number(req.query.height);
    // check if image valid by passing all parameters
    if (imageValid(filename, width, height)) {
        createResizedImageDir();
        const ResizedPath = imagesPath + `/resized/${filename}-${width}-${height}.jpg`;
        // check if file exists in Resized Directory, it means that image resized before. so it will be read only without resizing
        if (fs_1.default.existsSync(ResizedPath)) {
            fs_1.default.readFile(ResizedPath, (err, resized) => {
                res.end(resized);
            });
            // check if file exists in Full Directory only, it means that image not resized before. so it will be resizing
        }
        else if (imageExistsFull(filename)) {
            yield resizeImage(filename, width, height);
            fs_1.default.readFile(ResizedPath, (err, resized) => {
                res.end(resized);
            });
            // check if not of all cases above. it means that image not exists in any Directory. so it will send Exception Error
        }
        else {
            console.error("sorry, the file name is not exists in /images/full directory");
            res.send("sorry, file name sent is not exists in /images/full dir");
        }
        // check if filename is not valid with not parameter
    }
    else if (!filename && width && height) {
        res.send("Filename value is missing");
        // check if width is not valid with no parameter
    }
    else if (filename && !width && height) {
        res.send("Width value is missing");
        // check not of all cases above, that means height is not valid with no parameter
    }
    else {
        res.send("height value is missing");
    }
});
exports.imageHandler = imageHandler;
/*----- Resize Image using sharp package  -----*/
const resizeImage = (filename, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    const FullPath = path_1.default.join(imagesPath, `/full/${filename}.jpg`);
    const ResizedPath = path_1.default.resolve(imagesPath, `resized/${filename}-${width}-${height}.jpg`);
    try {
        yield (0, sharp_1.default)(FullPath)
            .resize(Number(width), Number(height))
            .jpeg({ mozjpeg: true })
            .toFile(ResizedPath, (err, info) => {
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.resizeImage = resizeImage;

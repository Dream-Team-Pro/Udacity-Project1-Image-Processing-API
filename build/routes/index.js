"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageExist = exports.checkUrlData = void 0;
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const routes = express_1.default.Router();
const resized_path = ('/images/resized/');
routes.use(express_1.default.static("public"));
const css_path = ('/css/main.css');
// get home page from public folder 
routes.get('/', (req, res) => {
    res.sendFile('/index.html');
});
routes.get('/images', function (req, res) {
    process.nextTick(() => {
        const FullPath = path_1.default.join(__dirname, `../../public/images/full/${filename}.jpg`);
        const ResizedPath = path_1.default.resolve(__dirname, `../../public/images/resized/${filename}-${width}-${height}.jpg`);
        (0, sharp_1.default)(FullPath)
            .rotate()
            .resize(Number(width), Number(height))
            .jpeg({ mozjpeg: true })
            .toFile(ResizedPath, (err, info) => {
            console.log('File has successfully resized.');
        });
    });
    const filename = req.query.filename;
    const width = req.query.width;
    const height = req.query.height;
    var des_fileName = (resized_path + filename + '-' + width + '-' + height + '.jpg');
    var response = '<div class="button2" href="/"><a class="button2" href="/">Home</a></div>';
    response += `<div class="contr"><h2>File resied successfully<br> it saved in [pubic/images/resized] folder</h2></div>`;
    response += `<link rel="stylesheet" href="` + css_path + `">`;
    response += `<div class="flex">`;
    response += `<div class="polaroid">`;
    response += `<img id="img" src="` + des_fileName + `"style="width:100%">`;
    response += `</div></div>`;
    response += `</div>`;
    // response += `<script src="js/script.js"></script>`
    return res.send(response);
});
// check Url Data entered from user isNot Empty
const checkUrlData = (filename, width, height) => {
    if (filename !== "" && width !== 0 && height !== 0) {
        return true;
    }
    else {
        return false;
    }
};
exports.checkUrlData = checkUrlData;
// check image exists in /images/full folder
const imageExist = (filename) => {
    if (fs_1.default.existsSync(`/images/full/${filename}`)) {
        return true;
    }
    else {
        return false;
    }
};
exports.imageExist = imageExist;
exports.default = routes;

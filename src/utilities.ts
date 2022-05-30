import { Request, Response } from "express";
import sharp from "sharp";
import fs from "fs";
import path from "path";

const imagesPath = path.join(__dirname, "..", "/public/images");

/*----- Create Resized Image directory if not Exists  -----*/
const createResizedImageDir = async (): Promise<boolean> => {
  if (!fs.existsSync(imagesPath + "/resized/")) {
    fs.mkdir(imagesPath + "/resized/", (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
  return true;
};

/*----- Check Image is Valid by passing name, width, height -----*/
const imageValid = (
  filename: string,
  width: number,
  height: number
): boolean => {
  if (filename !== "" && width !== 0 && height !== 0) {
    return true;
  } else {
    return false;
  }
};

// (imagesPath + '/resized/')
/*----- Check if image exists in /images/full Directory  -----*/
const imageExistsFull = (filename: string): boolean => {
  if (fs.existsSync(imagesPath + `/full/${filename}.jpg`)) {
    return true;
  } else {
    return false;
  }
};

/*----- check Handling cases of image   -----*/
const imageHandler = async (req: Request, res: Response) => {
  const filename = req.query.filename as string;
  const width = Number(req.query.width);
  const height = Number(req.query.height);

  // check if image valid by passing all parameters
  if (imageValid(filename, width, height)) {
    createResizedImageDir();
    const ResizedPath = imagesPath + `/resized/${filename}-${width}-${height}.jpg`;
    // check if file exists in Resized Directory, it means that image resized before. so it will be read only without resizing
    if (fs.existsSync(ResizedPath)) {
      fs.readFile(ResizedPath, (err, resized) => {        
        res.end(resized);
      });
      // check if file exists in Full Directory only, it means that image not resized before. so it will be resizing
    } else if (imageExistsFull(filename)) {
      await resizeImage(filename, width, height);
      fs.readFile(ResizedPath, (err, resized) => { 
        res.end(resized);
      });
      // check if not of all cases above. it means that image not exists in any Directory. so it will send Exception Error
    } else {
      console.error(
        "sorry, the file name is not exists in /images/full directory"
      );
      res.send("sorry, file name sent is not exists in /images/full dir");
    }
    // check if filename is not valid with not parameter
  } else if (!filename && width && height) {
    res.send("Filename value is missing");
    // check if width is not valid with no parameter
  } else if (filename && !width && height) {
    res.send("Width value is missing");
    // check not of all cases above, that means height is not valid with no parameter
  } else {
    res.send("height value is missing");
  }
};

/*----- Resize Image using sharp package  -----*/
const resizeImage = async (
  filename: string,
  width: number,
  height: number
): Promise<void> => {
  const FullPath = path.join(imagesPath, `/full/${filename}.jpg`);
  const ResizedPath = path.resolve(imagesPath, `resized/${filename}-${width}-${height}.jpg`);
  try {
    await sharp(FullPath)
      .resize(Number(width), Number(height))
      .jpeg({ mozjpeg: true })
      .toFile(ResizedPath, (err, info) => { 
      });
  } catch (error) {
    console.log(error);
  }
};

export {
  createResizedImageDir,
  imageValid,
  imageExistsFull,
  imageHandler,
  resizeImage,
};

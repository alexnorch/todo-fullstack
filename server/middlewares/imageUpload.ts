import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import multer from "multer";
import sharp from "sharp";

const multerStorage = multer.memoryStorage();

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: Function
) => {
  if (!file.mimetype.startsWith("image")) {
    return cb(new AppError("Only images are accepted", 400), false);
  }

  cb(null, true);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadPhoto = upload.single("photo");

const resizePhoto = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) return next();

  req.file.filename = `${req.userId}_${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/uploads/user_photos/${req.file.filename}`);

  next();
};

export { uploadPhoto, resizePhoto };

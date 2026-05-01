import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "chat-images",
    allowedFormats: ["jpg", "jpeg", "png", "gif", "webp"],
  } as any,
  transformation: [
    {
      width: 800,
      height: 600,
      crop: "limit",
    },
    { quality: "auto" },
  ],
} as any);

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("/images")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
});

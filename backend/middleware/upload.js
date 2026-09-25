const multer = require("multer");
const CloudinaryStorage = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");

const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images",
    resource_type: "image",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const uploadImage = multer({
  storage: imageStorage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = uploadImage;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.cloudinaryPush = void 0;
var cloudinary = require('cloudinary').v2;
var CloudinaryStorage = require('multer-storage-cloudinary').CloudinaryStorage;
exports.cloudinaryPush = cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
exports.storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'Gallery',
    allowedFormats: ['jpeg', 'png', 'jpg'],
});

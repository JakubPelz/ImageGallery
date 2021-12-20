"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
var path = require('path');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, '../images');
    },
    filename: function (req, file, callback) {
        console.log(file);
        callback(null, Date.now() + path.extname(file.originalname));
    },
});
exports.upload = multer({ storate: storage });

"use strict";
var multer = require('multer');
// set storage
var storage = multer.diskStorage({
    // @ts-ignore
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    // @ts-ignore
    filename: function (req, file, cb) {
        // image.jpg
        var ext = file.originalname.substr(file.originalname.lastIndexOf('.'));
        cb(null, file.fieldname + '-' + Date.now() + ext);
    },
});
// @ts-ignore
module.exports = store = multer({ storage: storage });

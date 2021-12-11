"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryValidation = void 0;
var express_validation_1 = require("express-validation");
exports.GalleryValidation = express_validation_1.Joi.object({
    gallery_name: express_validation_1.Joi.string(),
    gallery_description: express_validation_1.Joi.string(),
    photos: express_validation_1.Joi.string(),
});

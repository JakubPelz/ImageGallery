"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var gallerySchema = new __1.mongoose.Schema({
    gallery_name: {
        type: String,
        trim: true,
        index: true,
        lowercase: true,
    },
    gallery_description: {
        type: String,
    },
    photos: [],
});
module.exports = __1.mongoose.model('Gallery', gallerySchema);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var ImageSchema = new __1.mongoose.Schema({
    address: {
        type: String,
    },
    /* register_date: {
      type: Date,
      default: Date.now,
    }, */
});
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
    photos: [
        {
            address: {
                type: String,
            },
            register_date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});
module.exports = __1.mongoose.model('Gallery', gallerySchema);

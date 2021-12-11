"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var photoSchema = new __1.mongoose.Schema({
    photo_name: String,
    description: String,
    image: String,
});
module.exports = __1.mongoose.model('Photo', photoSchema);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
// Create Schema
var ImageSchema = new __1.mongoose.Schema({
    address: {
        type: String,
    },
    register_date: {
        type: Date,
        default: Date.now,
    },
    address_id: {
        type: String,
        unique: true,
    },
});
module.exports = Image = __1.mongoose.model('image', ImageSchema);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var userSchema = new __1.mongoose.Schema({
    first_name: {
        type: String,
        trim: true,
        max: 32,
        index: true,
        lowercase: true,
    },
    last_name: {
        type: String,
        trim: true,
        max: 32,
        index: true,
        lowercase: true,
    },
    email: {
        type: String,
        trim: true,
        require: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
    },
    password_confirm: {
        type: String,
    },
});
module.exports = __1.mongoose.model('User', userSchema);

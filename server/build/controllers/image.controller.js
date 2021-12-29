"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePhotoFromGallery = exports.DeletePhotoFromImages = exports.ShowAllImages = exports.ShowImages = exports.UploadImage = void 0;
var fs = require('fs');
var stream = require('stream');
var Gallery = require('../models/Gallery');
var Image = require('../models/Image');
var UploadImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var gallery, file, newImage, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, Gallery.findById({ _id: req.params.id })];
            case 1:
                gallery = _a.sent();
                if (!!req.files) return [3 /*break*/, 2];
                res.send({
                    status: false,
                    message: 'No file uploaded',
                });
                return [3 /*break*/, 5];
            case 2:
                file = req.files.file;
                newImage = Image({
                    address: file.name,
                    gallery_id: req.params.id,
                });
                return [4 /*yield*/, newImage.save()];
            case 3:
                _a.sent();
                //Use the mv() method to place the file in upload directory (i.e. "uploads")
                //save Image to Gallery subCollection
                gallery.photos.push({
                    address: file.name,
                });
                return [4 /*yield*/, gallery.save()];
            case 4:
                _a.sent();
                file.mv('./images/' + file.name);
                //send response
                res.send({
                    status: true,
                    message: 'File is uploaded',
                    data: {
                        name: file.name,
                        data: file.data,
                        size: file.size,
                        encoding: file.encoding,
                        tempFilePath: file.tempFilePath,
                        truncated: file.truncated,
                        mimetype: file.mimetype,
                        md5: file.md5,
                        mv: file.mv,
                    },
                });
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                err_1 = _a.sent();
                res.status(500).send(err_1);
                return [3 /*break*/, 7];
            case 7:
                console.log(req.params.id);
                return [2 /*return*/];
        }
    });
}); };
exports.UploadImage = UploadImage;
var ShowImages = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var imagePath, r, ps;
    return __generator(this, function (_a) {
        imagePath = req.params.path;
        r = fs.createReadStream(process.cwd() + "/images/" + imagePath);
        ps = new stream.PassThrough();
        stream.pipeline(r, ps, // <---- this makes a trick with stream error handling
        function (err) {
            if (err) {
                console.log(err); // No such file or any other kind of error
                return res.sendStatus(400);
            }
        });
        ps.pipe(res);
        return [2 /*return*/];
    });
}); };
exports.ShowImages = ShowImages;
var ShowAllImages = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var showImages;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Image.find({})];
            case 1:
                showImages = _a.sent();
                res.json(showImages);
                return [2 /*return*/];
        }
    });
}); };
exports.ShowAllImages = ShowAllImages;
var DeletePhotoFromImages = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); };
exports.DeletePhotoFromImages = DeletePhotoFromImages;
var DeletePhotoFromGallery = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Image.deleteOne({ _id: req.params.id })];
            case 1:
                _b.sent();
                res.status(204).send();
                return [3 /*break*/, 3];
            case 2:
                _a = _b.sent();
                res.status(404);
                res.send({ error: "Image doesn't exist." });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.DeletePhotoFromGallery = DeletePhotoFromGallery;

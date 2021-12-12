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
exports.DeleteGallery = exports.UpdateGallery = exports.GetGallery = exports.ShowGalleries = exports.CreateGallery = void 0;
var Gallery = require('../models/Gallery');
var gallery_validation_1 = require("../validation/gallery.validation");
var CreateGallery = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, error, newGallery;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                error = gallery_validation_1.GalleryValidation.validate(body).error;
                if (error) {
                    return [2 /*return*/, res.status(400).send(error.details)];
                }
                newGallery = Gallery({
                    gallery_name: body.gallery_name,
                    gallery_description: body.gallery_description,
                });
                return [4 /*yield*/, newGallery.save(function (err) {
                        if (err) {
                            return res.status(400).json({
                                error: err,
                            });
                        }
                        res.json({
                            message: 'Success create a new Gallery',
                        });
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.CreateGallery = CreateGallery;
var ShowGalleries = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var showGalleries;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Gallery.find({})];
            case 1:
                showGalleries = _a.sent();
                /*  .limit(pageLimit)
                  .skip(pageLimit * page); */
                res.json(showGalleries);
                return [2 /*return*/];
        }
    });
}); };
exports.ShowGalleries = ShowGalleries;
var GetGallery = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var gallery, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Gallery.findById({ _id: req.params.id })];
            case 1:
                gallery = _b.sent();
                res.send(gallery);
                return [3 /*break*/, 3];
            case 2:
                _a = _b.sent();
                res.status(404);
                res.send({ error: "Gallery doeasn't exist." });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.GetGallery = GetGallery;
var UpdateGallery = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var body, gallery, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                body = req.body;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Gallery.findById({ _id: req.params.id })];
            case 2:
                gallery = _b.sent();
                if (body.gallery_description) {
                    gallery.gallery_description = body.gallery_description;
                }
                if (body.gallery_name) {
                    gallery.gallery_name = body.gallery_name;
                }
                if (body.photos) {
                    gallery.photos = body.photos;
                }
                return [4 /*yield*/, gallery.save()];
            case 3:
                _b.sent();
                res.send(gallery);
                return [3 /*break*/, 5];
            case 4:
                _a = _b.sent();
                res.status(404);
                res.send({ error: "Gallery doeasn't exist." });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.UpdateGallery = UpdateGallery;
var DeleteGallery = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Gallery.deleteOne({ _id: req.params.id })];
            case 1:
                _b.sent();
                res.status(204).send();
                return [3 /*break*/, 3];
            case 2:
                _a = _b.sent();
                res.status(404);
                res.send({ error: "Gallery doesn't exist." });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.DeleteGallery = DeleteGallery;

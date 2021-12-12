"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageRoutes = exports.galleryRoutes = exports.routes = void 0;
var auth_controller_1 = require("../controllers/auth.controller");
var gallery_controller_1 = require("../controllers/gallery.controller");
var image_controller_1 = require("../controllers/image.controller");
var multer_1 = __importDefault(require("multer"));
var index_1 = require("../cloudinary/index");
var upload = (0, multer_1.default)({ storage: index_1.storage });
var routes = function (router) {
    router.post('/api/register', auth_controller_1.Register);
    router.post('/api/login', auth_controller_1.Login);
    router.get('/api/user', auth_controller_1.AuthenticatedUser);
    router.post('/api/logout', auth_controller_1.Logout);
};
exports.routes = routes;
var galleryRoutes = function (router) {
    router.post('/api/create-gallery', gallery_controller_1.CreateGallery);
    router.get('/api/show-galleries', gallery_controller_1.ShowGalleries);
    router.get('/api/gallery/:id', gallery_controller_1.GetGallery);
    router.put('/api/gallery/:id', gallery_controller_1.UpdateGallery);
    router.delete('/api/gallery/:id', gallery_controller_1.DeleteGallery);
};
exports.galleryRoutes = galleryRoutes;
var imageRoutes = function (router) {
    router.post('/api/photo', upload.array('image'), image_controller_1.UploadImage);
};
exports.imageRoutes = imageRoutes;

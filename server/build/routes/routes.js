"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.photoRoutes = exports.galleryRoutes = exports.routes = void 0;
var auth_controller_1 = require("../controllers/auth.controller");
var gallery_controller_1 = require("../controllers/gallery.controller");
var photo_controller_1 = require("../controllers/photo.controller");
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
    router.delete('/api/gallery/:id/delete', gallery_controller_1.DeleteGallery);
};
exports.galleryRoutes = galleryRoutes;
var photoRoutes = function (router) {
    router.post('/api/photo', photo_controller_1.UploadPhoto);
};
exports.photoRoutes = photoRoutes;

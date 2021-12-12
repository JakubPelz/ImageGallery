import { response, Router } from 'express';
import {
  Register,
  Login,
  AuthenticatedUser,
  Logout,
} from '../controllers/auth.controller';
import {
  CreateGallery,
  ShowGalleries,
  DeleteGallery,
  UpdateGallery,
  GetGallery,
} from '../controllers/gallery.controller';
import { UploadImage } from '../controllers/image.controller';
import multer from 'multer';
import { storage } from '../cloudinary/index';
const upload = multer({ storage });

export const routes = (router: Router) => {
  router.post('/api/register', Register);
  router.post('/api/login', Login);
  router.get('/api/user', AuthenticatedUser);
  router.post('/api/logout', Logout);
};

export const galleryRoutes = (router: Router) => {
  router.post('/api/create-gallery', CreateGallery);
  router.get('/api/show-galleries', ShowGalleries);
  router.get('/api/gallery/:id', GetGallery);
  router.put('/api/gallery/:id', UpdateGallery);
  router.delete('/api/gallery/:id', DeleteGallery);
};

export const imageRoutes = (router: Router) => {
  router.post('/api/photo', upload.array('image'), UploadImage);
};

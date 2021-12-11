import { Joi } from 'express-validation';

export const GalleryValidation = Joi.object({
  gallery_name: Joi.string(),
  gallery_description: Joi.string(),
  photos: Joi.string(),
});

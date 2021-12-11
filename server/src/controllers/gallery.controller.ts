import { Request, Response } from 'express';
const Gallery = require('../models/Gallery');
import { GalleryValidation } from '../validation/gallery.validation';

export const CreateGallery = async (req: Request, res: Response) => {
  const body = req.body;

  const { error } = GalleryValidation.validate(body);

  if (error) {
    return res.status(400).send(error.details);
  }

  let newGallery = Gallery({
    gallery_name: body.gallery_name,
    gallery_description: body.gallery_description,
    photos: body.photos,
  });
  await newGallery.save((err: String) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: 'Success create a new Gallery',
    });
  });
};

export const ShowGalleries = async (req: Request, res: Response) => {
  /* const pageLimit = 9;
  const page = parseInt((req.query.page as string) || '1'); */

  const showGallery = await Gallery.find({});
  /*  .limit(pageLimit)
    .skip(pageLimit * page); */

  res.json(showGallery);
};

export const GetGallery = async (req: Request, res: Response) => {
  res.send(await Gallery.findById(req.params.id));
};

export const UpdateGallery = async (req: Request, res: Response, next: any) => {
  const body = req.body;
  try {
    const gallery = await Gallery.findById({ _id: req.params.id });

    if (body.gallery_description) {
      gallery_description: body.gallery_description;
    }

    if (body.gallery_name) {
      gallery_name: body.gallery_name;
    }

    await gallery.save();
    res.send(gallery);
  } catch {
    res.status(404);
    res.send({ error: "Gallery doeasn't exist." });
  }
};

export const DeleteGallery = async (req: Request, res: Response) => {
  try {
    await Gallery.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Gallery doesn't exist." });
  }
};

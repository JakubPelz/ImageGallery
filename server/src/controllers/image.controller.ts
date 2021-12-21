import { Request, Response } from 'express';
import { Db } from 'mongodb';
import { mongoose } from '..';
import { GalleryValidation } from '../validation/gallery.validation';
const fs = require('fs');
const stream = require('stream');
const Gallery = require('../models/Gallery');
const { createReadStream, createWriteStream } = require('fs');
const path = require('path');

export const UploadImage = async (req: Request, res: Response) => {
  res.send('Image post');
  // @ts-ignore
  console.log(req.files.file);
};

export const ShowImages = async (req: Request, res: Response) => {
  const imagePath = req.params.path;
  const r = fs.createReadStream(`${process.cwd()}/images/${imagePath}`); // or any other way to get a readable stream
  console.log('r', r);
  const ps = new stream.PassThrough(); // <---- this makes a trick with stream error handling
  stream.pipeline(
    r,
    ps, // <---- this makes a trick with stream error handling
    (err: any) => {
      if (err) {
        console.log(err); // No such file or any other kind of error
        return res.sendStatus(400);
      }
    }
  );
  ps.pipe(res);
  // <---- this makes a trick with stream error handling
};

export const DeletePhoto = async (req: Request, res: Response) => {
  try {
    const gallery = await Gallery.findById({ _id: req.params.id }); // search ID gallery
    const imageIndex = gallery.photos.findIndex(
      (photo: any) => photo.id === req.params.idPhoto
    );

    if (imageIndex < 0) {
      res.status(404);
      res.send({ error: "Photo doesn't exist." });
    }

    gallery.photos.splice(imageIndex, 1);

    await gallery.save();
    res.send(gallery);
  } catch {
    res.status(404);
    res.send({ error: "Gallery doeasn't exist." });
  }
};

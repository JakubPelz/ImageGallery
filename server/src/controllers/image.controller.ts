import { Request, Response } from 'express';
const fs = require('fs');
const stream = require('stream');
const Gallery = require('../models/Gallery');

export interface imagePost {
  name: string;
  data: any;
  size: number;
  encoding: string;
  tempFilePath: string;
  truncated: boolean;
  mimetype: string;
  md5: string;
  mv: any;
}

export interface files {
  images: [imagePost];
}

export const UploadImage = async (req: Request, res: Response) => {
  // @ts-ignore
  console.log(req.files.file);
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded',
      });
    } else {
      // Use name of the input field to retrive the uploaded field
      // @ts-ignore
      let file = req.files.file;
      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      file.mv('./images/' + file.filename);

      //send response
      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
          name: file.filename,
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
    }
  } catch (err) {
    res.status(500).send(err);
  }
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

import { Request, Response } from 'express';
import { Db } from 'mongodb';
import { mongoose } from '..';
const fs = require('fs');
const stream = require('stream');
const Gallery = require('../models/Gallery');
const { createReadStream, createWriteStream } = require('fs');
const path = require('path');

export const UploadImage = async (req: Request, res: Response) => {
  // @ts-ignore

  // @ts-ignore
  console.log(req.files.file);
  // @ts-ignore
  console.log(req.files.file.name);
  // @ts-ignore
  console.log(req.files.file.path);
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
  console.log(req.params);
  /* try {
    await Gallery.update(
      { 'photos._id': req.params.id },
      { $pull: { 'photos.$.id': req.params.id } }
    );
  } catch {
    res.status(404);
    res.send({ error: "Image doesn't exist." });
  } */
};

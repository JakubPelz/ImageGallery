import { Request, Response } from 'express';
const fs = require('fs');
const stream = require('stream');

export const UploadImage = async (req: Request, res: Response) => {
  // @ts-ignore
  console.log(req.files.file);
  // @ts-ignore
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

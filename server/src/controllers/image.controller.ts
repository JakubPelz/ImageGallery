import { Request, Response } from 'express';
const fs = require('fs');
const stream = require('stream');
const Gallery = require('../models/Gallery');
const Image = require('../models/Image');

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
  //console.log(req.files.file);
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
      let newImage = Image({
        address: file.name,
        gallery_id: req.params.id,
      });
      await newImage.save();
      //Use the mv() method to place the file in upload directory (i.e. "uploads")

      //save Image to Gallery subCollection
      /* let ImageAddress = file.name.toString();
         Gallery.update(
        { _id: req.params.id },
        {
          $addToSet: {
            photos: {
              address: ImageAddress,
              name: file.name,
            },
          },
        },
        { upsert: true },
        function (error: string, success: string) {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
          }
        }
      ); */

      //send response
      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
          name: file.name,
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
  //console.log(req.params.id);
};

export const ShowImages = async (req: Request, res: Response) => {
  const imagePath = req.params.path;
  const r = fs.createReadStream(`${process.cwd()}/images/${imagePath}`); // or any other way to get a readable stream
  //const r = fs.createReadStream(`${process.cwd()}/images/2918574.png`); //${process.cwd()/images/img.jpg}
  //console.log('r', r);
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

export const ShowAllImages = async (req: Request, res: Response) => {
  const showImages = await Image.find({});
  res.json(showImages);
};

export const DeletePhotoFromImages = async (req: Request, res: Response) => {
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

export const DeletePhotoFromGallery = async (req: Request, res: Response) => {
  try {
    await Image.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Image doesn't exist." });
  }
};

export const GalleryImageUpdate = async (req: Request, res: Response) => {
  // @ts-ignore
  //console.log(req.files.file);
  //const gallery = await Gallery.findById({ _id: req.params.id });

  await Gallery.updateOne(
    { _id: req.params.id },
    { $addToSet: { photos: { address: 'ahoj' } } },
    {
      upsert: true,
      new: true,
    }
  )
    .then((result: any) => {
      console.log(`Content Posted ${result}`);
      res.send({ status: 'success' });
    })
    .catch((error: any) => {
      console.log(`Error ${error}`);
      res.send({ status: 'fail' });
    });

  /*  let newGalleryImage = {
    address: 'Nasrat',
    date: Date.now(),
  };
  Gallery.update(
    { _id: req.params.id },
    {
      $addToSet: {
        photos: { address: 'nasrat' },
      },
    },
    function (error: string, success: string) {
      if (error) {
        console.log(error);
      } else {
        console.log(success);
      }
    }
  ); */

  // @ts-ignore
  /*let file = req.files.file;
  try {
    if (gallery.photos) {
      gallery.photos = {
        address: file.name,
      };
    }

    await gallery.save();
    res.send(gallery);
  } catch {
    res.status(404);
    res.send({ error: "Photo doesn't exist." });
  }*/
};

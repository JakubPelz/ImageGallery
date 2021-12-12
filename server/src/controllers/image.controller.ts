import { Request, Response } from 'express';
/* import multer from 'multer';
const upload = multer({ dest: 'uploads/' }); */

export const UploadImage = async (req: Request, res: Response) => {
  console.log(req.files, req.body);
};

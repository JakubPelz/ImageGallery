const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req: Request, file: any, callback: any) => {
    callback(null, '../images');
  },
  filename: (req: Request, file: any, callback: any) => {
    console.log(file);
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storate: storage });

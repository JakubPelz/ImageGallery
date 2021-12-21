export const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
export const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
require('dotenv').config();

//try MULTER

// bring routes
import { routes, galleryRoutes, imageRoutes } from './routes/routes';
// app
const app = express();

// middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ Credential: true, origin: ['http://localhost:3000'] }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(fileUpload());

// database
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected'));

//Import Routes
routes(app);
galleryRoutes(app);
imageRoutes(app);

// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

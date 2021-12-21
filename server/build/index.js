"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoose = exports.express = void 0;
exports.express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
exports.mongoose = require('mongoose');
var fileUpload = require('express-fileupload');
require('dotenv').config();
//try MULTER
// bring routes
var routes_1 = require("./routes/routes");
// app
var app = (0, exports.express)();
// middlewares
app.use(exports.express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ Credential: true, origin: ['http://localhost:3000'] }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(fileUpload());
// database
exports.mongoose
    .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(function () { return console.log('DB connected'); });
//Import Routes
(0, routes_1.routes)(app);
(0, routes_1.galleryRoutes)(app);
(0, routes_1.imageRoutes)(app);
// port
var port = process.env.PORT || 8000;
app.listen(port, function () {
    console.log("Server is running on port " + port + ".");
});

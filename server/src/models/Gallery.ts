import { mongoose } from '..';

const ImageSchema = new mongoose.Schema({
  address: {
    type: String,
  },
  name: {
    type: String,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
});

const gallerySchema = new mongoose.Schema({
  gallery_name: {
    type: String,
    trim: true,
    index: true,
    lowercase: true,
  },
  gallery_description: {
    type: String,
  },
  photos: [ImageSchema],
  required: false,
});

module.exports = mongoose.model('Gallery', gallerySchema);

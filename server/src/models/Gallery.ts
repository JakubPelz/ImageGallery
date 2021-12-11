import { mongoose } from '..';

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
  photos: [],
});

module.exports = mongoose.model('Gallery', gallerySchema);

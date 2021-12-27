import { number } from 'joi';
import { mongoose } from '..';

const ImageSchema = new mongoose.Schema({
  address: {
    type: String,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
  gallery_id: {
    type: String,
  },
});

module.exports = mongoose.model('Image', ImageSchema);

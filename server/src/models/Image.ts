import { mongoose } from '..';

const ImageSchema = new mongoose.Schema({
  address: {
    type: String,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Image = mongoose.model('image', ImageSchema);

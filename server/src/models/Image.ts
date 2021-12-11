import { mongoose } from '..';

// Create Schema
const ImageSchema = new mongoose.Schema({
  address: {
    type: String,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
  address_id: {
    type: String,
    unique: true,
  },
});

module.exports = Image = mongoose.model('image', ImageSchema);

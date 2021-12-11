import { mongoose } from '..';

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    trim: true,
    max: 32,
    index: true,
    lowercase: true,
  },
  last_name: {
    type: String,
    trim: true,
    max: 32,
    index: true,
    lowercase: true,
  },
  email: {
    type: String,
    trim: true,
    require: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
  password_confirm: {
    type: String,
  },
});

module.exports = mongoose.model('User', userSchema);

import { Schema, model } from 'mongoose';

const scoreSchema = new Schema({
  score: {
    type: Number,
    required: true
  },
  game: {
    type: String,
    required: true,
    enum: {
      values: ['snake', 'pac-man', 'tetris'],
      message: '{VALUE} is not supported'
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new  Schema({
  nickname: {
    type: String,
    required: true,
    unique: true
  },
  scores: [scoreSchema]
});

const User = model('User', userSchema);
export default User;

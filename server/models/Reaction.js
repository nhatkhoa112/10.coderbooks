const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reactionSchema = Schema(
  {
    type: ['Like', 'Heart', 'Surprise', 'Angry', 'Sad'],
    owner: {
      ref: 'User',
      required: true,
      type: Schema.Types.ObjectId,
    },
    post: {
      ref: 'Post',
      required: true,
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

const Reaction = mongoose.model('Reaction', reactionSchema);
module.exports = Reaction;

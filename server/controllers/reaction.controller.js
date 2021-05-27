const Reaction = require('../models/Reaction');

// We don't use AppError & sendResponse in this controller.
const {
  AppError,
  catchAsync,
  sendResponse,
} = require('../helpers/utils.helper');

const reactionController = {};

reactionController.create = catchAsync(async (req, res) => {
  const comment = await Comment.create({
    owner: req.userId,
    body: req.body.body,
    post: req.body.postId,
  });

  // Here we'd need to update the post as well.

  res.json(comment);
});

reactionController.read = async (req, res) => {
  const reaction = await Reaction.findOne({ _id: req.params.id }).populate(
    'owner'
  );
  if (!reaction) {
    res.status(404).json({ message: 'reaction  not found.' });
  } else {
    res.json(reaction);
  }
};

reactionController.update = async (req, res) => {
  let newReaction = await Reaction.findByIdAndUpdate(
    { _id: req.params.reactionId },
    { ...req.body },
    { new: true }
  );
  if (!newReaction)
    return res.status(404).json({ message: 'Comment not found' });
  let reaction = await Reaction.findById(req.params.reactionId).populate(
    'owner'
  );
  res.status(200).json(reaction);
};

reactionController.destroy = async (req, res) => {
  // console.log(req.params);
  // console.log(req.body);
  let reaction = await Reaction.findByIdAndDelete(req.params.reactionId);
  console.log(reaction);
  if (!reaction) return res.status(404).json({ msg: 'Reaction not found' });
  res.status(200).json(reaction);
};

reactionController.list = async (req, res) => {
  await Reaction.find({}, (err, reactions) => {
    if (!reactions) {
      res.status(404).json({ message: 'Reactions not found.' });
    } else {
      res.json(reactions);
    }
  });
};

module.exports = reactionController;

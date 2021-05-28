const Comment = require('../models/Comment');

// We don't use AppError & sendResponse in this controller.
const {
  AppError,
  catchAsync,
  sendResponse,
} = require('../helpers/utils.helper');

const commentsController = {};

commentsController.create = catchAsync(async (req, res) => {
  const comment = await Comment.create({
    owner: req.userId,
    body: req.body.body,
    post: req.body.postId,
  });

  // Here we'd need to update the post as well.

  res.json(comment);
});

commentsController.read = async (req, res) => {
  const comment = await Comment.findOne({ _id: req.params.id }).populate(
    'owner'
  );
  if (!comment) {
    res.status(404).json({ message: 'Comment not found.' });
  } else {
    res.json(comment);
  }
};

commentsController.update = async (req, res) => {
  let newComment = await Comment.findByIdAndUpdate(
    { _id: req.params.commentId },
    { ...req.body },
    { new: true }
  );
  if (!newComment)
    return res.status(404).json({ message: 'Comment not found' });
  let comment = await Comment.findById(req.params.commentId).populate('owner');
  res.status(200).json(comment);
};

commentsController.destroy = async (req, res) => {
  // console.log(req.params);
  // console.log(req.body);
  let comment = await Comment.findByIdAndDelete(req.params.commentId);
  if (!comment) return res.status(404).json({ msg: 'Comment not found' });
  res.status(200).json(comment);
};

commentsController.list = async (req, res) => {
  await Comment.find({}, (err, comments) => {
    if (!comments) {
      res.status(404).json({ message: 'Comments not found.' });
    } else {
      res.json(comments);
    }
  });
};

module.exports = commentsController;

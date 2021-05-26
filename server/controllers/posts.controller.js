const Post = require('../models/Post');
const Comment = require('../models/Comment');

const {
  AppError,
  catchAsync,
  sendResponse,
} = require('../helpers/utils.helper');

const postController = {};

postController.create = catchAsync(async (req, res) => {
  const post = await Post.create({ owner: req.userId, ...req.body });
  const newPost = await Post.findById(post._id).populate(
    'owner',
    '-_id -__v  -createdAt -updatedAt'
  );
  res.status(200).json(newPost);
});

postController.read = catchAsync(async (req, res, next) => {
  const post = await Post.findOne({ _id: req.params.id });
  if (!post)
    return next(new AppError(404, 'Post not found', 'Get Single Post Error'));
  await post.populate('owner').populate('comments');
  await post.execPopulate();

  res.json(post);
});

postController.update = catchAsync(async (req, res) => {
  await Post.findByIdAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    // { email: req.body.email },
    { new: true },
    (err, post) => {
      console.log({ err, post });
      if (!post) {
        res.status(404).json({ message: 'Post not Found' });
      } else {
        res.json(post);
      }
    }
  );
});

postController.destroy = catchAsync(async (req, res) => {
  await Post.findByIdAndDelete(req.params.id, (err, post) => {
    if (!post) {
      res.status(404).json({ message: 'Post not Found' });
    } else {
      res.json(post);
    }
  });
});

postController.list = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  let skip = page === 0 ? 0 : (page - 1) * limit;

  const posts = await Post.find({})
    .populate('owner')
    .populate('comments')
    .populate({
      path: 'comments',
      populate: {
        path: 'owner',
      },
    })
    .populate({
      path: 'comments',
      populate: {
        path: 'post',
      },
    })

    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);

  return sendResponse(res, 200, true, { posts }, null, 'Received posts');
});

postController.createComment = async (req, res) => {
  const comment = await Comment.create({
    ...req.body,
    owner: req.userId,
    post: req.params.id,
  });

  // const newComment = await Comment.findById(comment._id)
  //   .populate('owner')
  //   .populate('user');

  // console.log(newComment);

  const newPost = await Post.findById(req.params.id);
  newPost.comments.unshift(comment);

  await newPost.save();
  const post = await Post.findById(req.params.id)
    .populate('owner')
    .populate('comments')
    .populate({
      path: 'comments',
      populate: {
        path: 'owner',
      },
    })
    .populate({
      path: 'comments',
      populate: {
        path: 'post',
      },
    });

  return sendResponse(res, 200, true, { post }, null, 'Comment created!');
};

module.exports = postController;

const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Reaction = require('../models/Reaction');

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
      path: 'reactions',
      populate: {
        path: 'owner',
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
    .populate('reactions')
    .populate({
      path: 'reactions',
      populate: {
        path: 'owner',
      },
    });

  return sendResponse(res, 200, true, { post }, null, 'Comment created!');
};

postController.getPostsByUserEmail = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  let skip = page === 0 ? 0 : (page - 1) * limit;
  const posts = await Post.find({ owner: req.userId })
    .populate('owner')
    .populate('comments')
    .populate({
      path: 'comments',
      populate: {
        path: 'owner',
      },
    })
    .skip(skip)
    .sort({ _id: -1 })
    .limit(limit);
  return sendResponse(res, 200, true, { posts }, null, 'Received posts');
};

postController.createReaction = async (req, res) => {
  const reaction = await Reaction.create({
    ...req.body,
    owner: req.userId,
    post: req.params.id,
  });

  const newPost = await Post.findById(req.params.id);
  newPost.reactions.push(reaction._id);

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
    .populate('reactions')
    .populate({
      path: 'reactions',
      populate: {
        path: 'owner',
      },
    });
  return sendResponse(res, 200, true, { post }, null, 'Reaction created!');
};

module.exports = postController;

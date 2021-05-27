var express = require('express');
var router = express.Router();

const authMiddleware = require('../middlewares/authentication');
const postsController = require('../controllers/posts.controller');
const commentsController = require('../controllers/comments.controller');

router.get('/', postsController.list);
router.post(
  '/:id/comments',
  authMiddleware.loginRequired,
  postsController.createComment
);

router.delete(
  '/:postId/comments/:commentId',
  authMiddleware.loginRequired,
  commentsController.destroy
);

router.get(
  '/:userEmail',
  authMiddleware.loginRequired,
  postsController.getPostsByUserEmail
);

router.patch(
  '/:postId/comments/:commentId',
  authMiddleware.loginRequired,
  commentsController.update
);

router.get('/:id', postsController.read);
router.post('/:id', postsController.read);
router.post('/', authMiddleware.loginRequired, postsController.create);

router.patch('/:id', postsController.update);
router.delete('/:id', postsController.destroy);

module.exports = router;

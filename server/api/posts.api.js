var express = require('express');
var router = express.Router();

const authMiddleware = require('../middlewares/authentication');
const postsController = require('../controllers/posts.controller');

router.get('/', postsController.list);
router.post(
  '/:id/comments',
  authMiddleware.loginRequired,
  postsController.createComment
);
router.get('/:id', postsController.read);
router.post('/:id', postsController.read);
router.post('/', authMiddleware.loginRequired, postsController.create);

router.patch('/:id', postsController.update);
router.delete('/:id', postsController.destroy);

module.exports = router;

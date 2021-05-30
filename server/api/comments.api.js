var express = require('express');
var router = express.Router();

const authMiddleware = require('../middlewares/authentication');
const commentsController = require('../controllers/comments.controller');
const reactionController = require('../controllers/reaction.controller');

router.post('/', authMiddleware.loginRequired, commentsController.create);
router.get('/', commentsController.list);
router.get('/:id', commentsController.read);
router.put('/:id', commentsController.update);
router.delete('/:id', commentsController.destroy);

// reaction in comment

router.post(
  '/:id/reactions',
  authMiddleware.loginRequired,
  reactionController.create
);

router.get('/:id/reactions', reactionController.list);
router.put('/:id/reactions/:reactionId', reactionController.update);
router.delete('/:id/reactions/:reactionId', reactionController.destroy);

module.exports = router;

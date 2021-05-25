const express = require('express');
const router = express.Router();

const usersRouter = require("./users.api");
router.use('/users', usersRouter)

const authRouter = require("./auth.api");
router.use('/auth', authRouter)

const postsRouter = require("./posts.api");
router.use('/posts', postsRouter)

const commentsRouter = require("./comments.api");
router.use('/comments', commentsRouter)

module.exports = router;

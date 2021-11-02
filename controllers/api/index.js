const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

router.use('/User', userRoutes);
router.use('/Post', postRoutes);
router.use('/Comment', commentRoutes);

module.exports = router;
const router = require('express').Router();
const posts = require('../controllers/posts');

router.get('/', (_req, res) => res.send('Welcome to Blogger App!'));

router.get('/get-posts', posts.getAllPosts);

module.exports = router;

const router = require('express').Router();
const posts = require('../controllers/posts');
const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

// Route to handle requests to the root URL
router.get('/', (_req, res) => res.send('Welcome to Blogger App!'));

// Route to handle GET requests for retrieving all posts
router.get('/get-posts', posts.getAllPosts);

// Route to handle POST requests for creating a new blog post
router.post('/create-blog', upload.single('file'), posts.createBlog);

module.exports = router;

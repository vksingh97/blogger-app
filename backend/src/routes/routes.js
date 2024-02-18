const router = require('express').Router();
const postController = require('../controllers/posts');
const userController = require('../controllers/users');
const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

// Route to handle requests to the root URL
router.get('/', (_req, res) => res.send('Welcome to Blogger App!'));

// Route to handle GET requests for retrieving all posts
router.get('/get-posts', postController.getAllPosts);

// Route to handle POST requests for creating a new blog post
router.post('/create-blog', upload.single('file'), postController.createBlog);

// Route to handle POST requests to register new user
router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

module.exports = router;

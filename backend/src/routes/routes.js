const router = require('express').Router();
const postController = require('../controllers/posts');
const userController = require('../controllers/users');
const multer = require('multer');
const rateLimit = require('express-rate-limit');
const authenticate = require('../middlewares/authenticate');

// Define rate limit options
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
});

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

// Route to handle requests to the root URL
router.get('/', (_req, res) => res.send('Welcome to Blogger App!'));

// Route to handle GET requests for retrieving all posts
router.get(
  '/get-posts',
  //  authenticate,
  postController.getAllPosts
);

// Route to handle POST requests for creating a new blog post
router.post(
  '/create-blog',
  // authenticate,
  upload.single('file'),
  postController.createBlog
);

// Route to handle POST requests to register new user
router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

router.post('/posts/:postId/like', postController.updatePostLikes);

router.get(
  '/trending-posts',
  //  authenticate,
  postController.getTrendingPosts
);

router.post('/posts/:postId/favourite', postController.updateFavourites);

router.get(
  '/get-favourite-posts/:userId',
  // authenticate,
  postController.getUserTrendingPosts
);

router.post('/summarise', limiter, postController.getPostSummary);

router.delete('/delete-post/:postId', postController.deletePost);

router.put(
  '/edit-post/:postId',
  upload.single('file'),
  postController.editBlog
);

module.exports = router;

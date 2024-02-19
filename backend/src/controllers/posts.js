const postService = require('../services/posts');

module.exports = {
  // Controller function for retrieving all posts
  getAllPosts: async (req, res) => {
    try {
      // Call the service function to get all posts
      const response = await postService.getAllPosts({});

      if (response.ok) {
        return res.success({ data: response.data });
      } else {
        return res.failure({ msg: response.err });
      }
    } catch (e) {
      return res.failure({});
    }
  },

  // Controller function for creating a new blog post
  createBlog: async (req, res) => {
    try {
      const { body: bodyData } = req;
      const file = req.file;
      const payload = { file, ...bodyData };
      // Call the service function to create a new blog post
      const response = await postService.createBlog({ payload });

      if (response.ok) {
        return res.success({ data: response.data });
      } else {
        return res.failure({ msg: response.err });
      }
    } catch (e) {
      return res.failure({});
    }
  },
  updatePostLikes: async (req, res) => {
    const {
      body: { userId, like },
    } = req;
    const { postId } = req.params;
    if (!(userId && like && postId)) {
      return res.failure({ msg: 'Missing fields' });
    }
    try {
      const payload = { userId, postId, like };
      const response = await postService.updatePostLikes({ payload });
      if (response.ok) {
        return res.success({ data: response.data });
      } else {
        return res.failure({ msg: response.err });
      }
    } catch (e) {
      return res.failure({});
    }
  },
  getTrendingPosts: async (req, res) => {
    try {
      const response = await postService.getTrendingPosts({});
      if (response.ok) {
        return res.success({ data: response.data });
      } else {
        return res.failure({ msg: response.err });
      }
    } catch (error) {
      return res.failure({});
    }
  },
  updateFavourites: async (req, res) => {
    const {
      body: { userId, isFavourite },
    } = req;
    const { postId } = req.params;
    if (!(userId && postId)) {
      return res.failure({ msg: 'Missing fields' });
    }
    try {
      const payload = { userId, postId, isFavourite };
      const response = await postService.updateFavourites({ payload });
      if (response.ok) {
        return res.success({ data: response.data });
      } else {
        return res.failure({ msg: response.err });
      }
    } catch (error) {
      return res.failure({});
    }
  },
  getUserTrendingPosts: async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
      return res.failure({ msg: 'Missing userId' });
    }

    try {
      // Call the service function to get all posts
      const response = await postService.getUserTrendingPosts({ userId });

      if (response.ok) {
        return res.success({ data: response.data });
      } else {
        return res.failure({ msg: response.err });
      }
    } catch (e) {
      return res.failure({});
    }
  },
};

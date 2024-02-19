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
    try {
      const {
        body: { userId, like },
      } = req;
      const { postId } = req.params;

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
};

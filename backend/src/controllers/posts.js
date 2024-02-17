const posts = require('../services/posts');

module.exports = {
  // Controller function for retrieving all posts
  getAllPosts: async (req, res) => {
    try {
      // Call the service function to get all posts
      const response = await posts.getAllPosts({});

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
      const response = await posts.createBlog({ payload });

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

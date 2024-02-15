const posts = require('../services/posts');
module.exports = {
  getAllPosts: async (req, res) => {
    try {
      const response = posts.getAllPosts({});
      if (response.ok) {
        return res.success({ data: response.data });
      }
      return res.failure({ msg: response.err });
    } catch (e) {
      return res.failure({});
    }
  },
};

const postModel = require('../models/posts');

module.exports = {
  getAllPosts: async ({}) => {
    try {
      const resp = await postModel.find({});
      console.log(resp);
      return { ok: true, data: resp };
    } catch (error) {
      console.error(error);
      return { ok: false, err: 'An error occurred' };
    }
  },
};

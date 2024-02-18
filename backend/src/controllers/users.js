const userService = require('../services/users');

module.exports = {
  registerUser: async (req, res) => {
    try {
      const { body: payload } = req;
      // Call the service function to get all posts
      const response = await userService.registerUser({ payload });

      if (response.ok) {
        return res.success({ data: response.data });
      } else {
        return res.failure({ msg: response.err });
      }
    } catch (e) {
      return res.failure({});
    }
  },
  loginUser: async (req, res) => {
    try {
      const { body: payload } = req;
      // Call the service function to get all posts
      const response = await userService.loginUser({ payload });

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

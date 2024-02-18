const userModel = require('../models/users');

module.exports = {
  registerUser: async ({ payload }) => {
    if (
      !(
        payload.firstname &&
        payload.lastname &&
        payload.email &&
        payload.password
      )
    ) {
      return { ok: false, err: 'Enter  all fields' };
    }
    try {
      const resp = await userModel.create({
        insertDict: {
          firstname: payload.firstname,
          lastname: payload.lastname,
          email: payload.email,
          password: payload.password,
        },
      });
      return { ok: true, data: resp };
    } catch (error) {
      console.error(error);
      return { ok: false, err: 'An error occurred' };
    }
  },
  loginUser: async ({ payload }) => {
    if (!(payload.email && payload.password)) {
      return { ok: false, err: 'Enter  all fields' };
    }
    try {
      const resp = await userModel.findOne({
        query: {
          email: payload.email,
          systemIsDeleted: false,
        },
        projection: { firstname: 1, lastname: 1, email: 1, password: 1 },
      });
      if (
        resp &&
        Object.values(resp).length &&
        resp.password === payload.password
      ) {
        return {
          ok: true,
          data: {
            firstname: resp.firstname,
            lastname: resp.lastname,
            email: resp.email,
          },
        };
      }

      return { ok: false, err: 'User not registered' };
    } catch (error) {
      console.error(error);
      return { ok: false, err: 'An error occurred' };
    }
  },
};

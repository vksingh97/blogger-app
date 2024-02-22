const userModel = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  registerUser: async ({ payload }) => {
    if (!(payload.username && payload.email && payload.password)) {
      return { ok: false, err: 'Enter  all fields' };
    }
    try {
      const respLogin = await userModel.findOne({
        query: {
          email: payload.email,
          systemIsDeleted: false,
        },
        projection: { username: 1, email: 1, password: 1 },
      });
      if (respLogin && Object.values(respLogin).length) {
        return { ok: false, err: 'User already registered' };
      }

      const encryptedPass = await bcrypt.hash(payload.password, 10);
      await userModel.create({
        insertDict: {
          username: payload.username,
          email: payload.email,
          password: encryptedPass,
        },
      });
      return { ok: true };
    } catch (error) {
      console.error(error);
      return { ok: false, err: 'An error occurred' };
    }
  },
  loginUser: async ({ payload, res }) => {
    if (!(payload.email && payload.password)) {
      return { ok: false, err: 'Enter  all fields' };
    }
    try {
      const resp = await userModel.findOne({
        query: {
          email: payload.email,
          systemIsDeleted: false,
        },
        projection: { username: 1, email: 1, password: 1, _id: 1 },
      });

      if (
        resp &&
        Object.values(resp).length &&
        (await bcrypt.compare(payload.password, resp.password))
      ) {
        const token = jwt.sign(
          {
            username: resp.username,
            email: resp.email,
            id: resp._id.toString(),
          },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: '1h',
          }
        );
        console.log(token);
        res.cookie('authToken', token, {
          httpOnly: true,
        });
        console.log(res);

        return {
          ok: true,
          data: {
            username: resp.username,
            email: resp.email,
            id: resp._id.toString(),
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

const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserModel = mongoose.model(
  'users',
  new Schema(
    {
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      systemIsDeleted: { type: Boolean, default: false },
    },
    {
      timestamps: {
        createdAt: 'systemCreatedAt',
        updatedAt: 'systemUpdatedAt',
      },
      strict: false,
    }
  ),
  'users'
);

module.exports = {
  UserModel,

  create: async ({ insertDict }) => new UserModel(insertDict).save(),

  findOne: async ({ query, projection }) =>
    UserModel.findOne(query, projection).lean(),

  find: async ({ query, projection }) =>
    UserModel.find(query, projection).lean(),

  updateOne: ({ query, updateDict }) => UserModel.updateOne(query, updateDict),

  update: async ({ query, updateDict }) =>
    UserModel.updateMany(query, updateDict),
};

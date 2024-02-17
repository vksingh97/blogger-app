const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const { Schema } = mongoose;

const PostsModel = mongoose.model(
  'posts',
  new Schema(
    {
      title: { type: String, default: '' },
      content: { type: String, default: '' },
      author: { type: String, default: '' },
      tags: { type: Array, default: [] },
      comments: { type: Array, default: [] },
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
  'posts'
);

module.exports = {
  PostsModel,

  create: async ({ insertDict }) => new PostsModel(insertDict).save(),

  findOne: async ({ query, projection }) =>
    PostsModel.findOne(query, projection).lean(),

  find: async ({ query, projection }) =>
    PostsModel.find(query, projection).lean(),

  updateOne: ({ query, updateDict }) => PostsModel.updateOne(query, updateDict),

  update: async ({ query, updateDict }) =>
    PostsModel.updateMany(query, updateDict),
};

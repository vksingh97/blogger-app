const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostsModel = mongoose.model(
  'posts',
  new Schema(
    {
      title: { type: String, required: true },
      content: { type: String, required: true },
      author: { type: String, default: '' },
      authorId: { type: mongoose.Types.ObjectId, required: true, ref: 'users' },
      likedBy: [{ type: mongoose.Types.ObjectId, ref: 'users' }],
      likes: { type: Number, default: 0 },
      tags: { type: Array, default: [] },
      imageUrl: { type: String, default: '' },
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

  getAllPosts: async ({}) => {
    const posts = await PostsModel.find({})
      .sort({ systemCreatedAt: -1 })
      .lean();
    return posts;
  },
};

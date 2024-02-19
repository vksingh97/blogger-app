const mongoose = require('mongoose');
const { Schema } = mongoose;
const FavoritePostModel = mongoose.model(
  'favorite_posts',
  new Schema(
    {
      userId: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
      postId: { type: mongoose.Types.ObjectId, ref: 'posts', required: true },
      systemIsDeleted: { type: Boolean, default: false },
    },
    {
      timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
      },
      strict: false,
    }
  ),
  'favorite_posts'
);

module.exports = {
  FavoritePostModel,

  create: async ({ insertDict }) => new FavoritePostModel(insertDict).save(),

  findOne: async ({ query, projection }) =>
    FavoritePostModel.findOne(query, projection).lean(),

  find: async ({ query, projection }) =>
    FavoritePostModel.find(query, projection).lean(),

  updateOne: ({ query, updateDict }) =>
    FavoritePostModel.updateOne(query, updateDict),

  update: async ({ query, updateDict }) =>
    FavoritePostModel.updateMany(query, updateDict),

  deleteOne: async ({ query }) => FavoritePostModel.deleteOne(query),

  getAllPosts: async ({}) => {
    const posts = await FavoritePostModel.find({})
      .sort({ systemCreatedAt: -1 })
      .lean();
    return posts;
  },
  insertMany: async ({ insertDict }) =>
    FavoritePostModel.insertMany(insertDict),
};

const postModel = require('../models/posts');
const admin = require('firebase-admin');
const serviceAccount = require('../../config/firebase-admin-key.json.json');
const mongoose = require('mongoose');
const redisClient = require('../redisClient');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://fir-fd238.appspot.com',
});

const storage = admin.storage();
const bucket = storage.bucket();

module.exports = {
  getAllPosts: async ({}) => {
    try {
      const resp = await postModel.getAllPosts({});
      return { ok: true, data: resp };
    } catch (error) {
      console.error(error);
      return { ok: false, err: 'An error occurred' };
    }
  },
  createBlog: async ({ payload }) => {
    if (!payload.file || !payload.file.buffer) {
      return { ok: false, err: 'File path is missing or undefined' };
    }

    try {
      const file = bucket.file(`post-media/${payload.file.originalname}`);

      const fileStream = file.createWriteStream({
        metadata: {
          contentType: payload.file.mimetype,
        },
        resumable: false,
      });

      fileStream.end(payload.file.buffer);

      await new Promise((resolve, reject) => {
        fileStream.on('finish', async () => {
          await file.makePublic();
          resolve();
        });
        fileStream.on('error', reject);
      });

      const fileUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
      console.log('File URL:', fileUrl);

      await postModel.create({
        insertDict: {
          title: payload.title,
          content: payload.content,
          imageUrl: fileUrl,
          authorId: payload.authorId,
          author: payload.author,
        },
      });

      return { ok: true };
    } catch (error) {
      console.error(error);
      return { ok: false, err: 'An error occurred during file upload' };
    }
  },
  updatePostLikes: async ({ payload }) => {
    if (!payload.userId || !payload.postId) {
      return { ok: false, err: 'Enter userId and postId' };
    }
    try {
      const updateQuery = payload.like
        ? {
            $addToSet: { likedBy: new mongoose.Types.ObjectId(payload.userId) },
            $inc: { likes: 1 },
          }
        : {
            $pull: { likedBy: new mongoose.Types.ObjectId(payload.userId) },
            $inc: { likes: -1 },
          };

      await postModel.updateOne({
        query: { _id: new mongoose.Types.ObjectId(payload.postId) },
        updateDict: updateQuery,
      });

      return { ok: true, data: payload.postId };
    } catch (error) {
      console.error(error);
      return { ok: false, err: 'An error occurred during updating likes' };
    }
  },
  getTrendingPosts: async ({}) => {
    try {
      const cachedData = await redisClient.get('trending_posts');
      if (cachedData) {
        console.log('Retrieved trending posts from Redis cache');
        return { ok: true, data: JSON.parse(cachedData) };
      }

      const trendingPosts = await postModel.getTrendingPosts({});
      const TTL = 3600;
      await redisClient.setex(
        'trending_posts',
        TTL,
        JSON.stringify(trendingPosts)
      );

      return { ok: true, data: trendingPosts };
    } catch (error) {
      console.error('Error fetching trending posts:', error);
      return { ok: false, err: 'An error occurred' };
    }
  },
};

const postModel = require('../models/posts');
const admin = require('firebase-admin');
const serviceAccount = require('../../config/firebase-admin-key.json.json'); // Replace with the path to your service account key file

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
    console.log(payload);
    // Verify that the path property is set in the payload.file object
    if (!payload.file || !payload.file.buffer) {
      return { ok: false, err: 'File path is missing or undefined' };
    }

    try {
      const file = bucket.file(`uploads/${payload.file.originalname}`);

      // Create a write stream to upload the file
      const fileStream = file.createWriteStream({
        metadata: {
          contentType: payload.file.mimetype,
          metadata: {
            postId: 'your-post-id',
          },
        },
        resumable: false,
      });

      // Write the file buffer to the write stream
      fileStream.end(payload.file.buffer);

      // Wait for the upload to finish
      await new Promise((resolve, reject) => {
        fileStream.on('finish', async () => {
          // Set the file ACL to public-read
          await file.makePublic();
          resolve();
        });
        fileStream.on('error', reject);
      });

      // Once the file is uploaded, you can get the URL and other details if needed
      const fileUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
      console.log('File URL:', fileUrl);

      await postModel.create({
        insertDict: {
          title: payload.title,
          content: payload.content,
          imageUrl: fileUrl,
        },
      });

      return { ok: true };
    } catch (error) {
      console.error(error);
      return { ok: false, err: 'An error occurred during file upload' };
    }
  },
};

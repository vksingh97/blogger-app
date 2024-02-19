require('dotenv').config({
  path: '../../.env',
});
require('../models/db');
const mongoose = require('mongoose');
const postModel = require('../models/posts');

const generateTestData = async () => {
  try {
    console.log('inside');

    const testData = [];

    const authorIds = [
      new mongoose.Types.ObjectId('65d2e715df44ddf8f6697802'),
      new mongoose.Types.ObjectId('65d1d073eb894c88545d3a9e'),
    ];

    const imageUrls = [
      'https://storage.googleapis.com/fir-fd238.appspot.com/uploads/Shaheen-Shah-Afridi-meme-template.webp',
      'https://storage.googleapis.com/fir-fd238.appspot.com/uploads/82yasf.png',
      'https://storage.googleapis.com/fir-fd238.appspot.com/uploads/PM_Modi_with_Giorgia_Meloni_1701457216381_1701457216666.avif',
    ];

    const titles = [
      'The Importance of Data Privacy in the Digital Age',
      'Exploring the Wonders of Artificial Intelligence',
      'The Future of Renewable Energy: Trends and Challenges',
    ];

    const contents = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat urna id nisi laoreet auctor.',
      'Praesent ultricies urna ac lacus efficitur, non feugiat justo posuere. Fusce ac dapibus sapien.',
      'Duis vitae ex nec orci dictum blandit vel ac odio. Phasellus nec velit nec urna posuere varius.',
    ];

    for (let i = 0; i < 100; i++) {
      const authorId = authorIds[Math.floor(Math.random() * authorIds.length)];
      const numLikes = Math.floor(Math.random() * 101);
      const likedBy = Array.from({ length: numLikes }, () => authorId);

      const postData = {
        title: titles[Math.floor(Math.random() * titles.length)],
        content: contents[Math.floor(Math.random() * contents.length)],
        author: 'Vivek',
        authorId: authorId,
        likedBy: likedBy,
        likes: numLikes,
        imageUrl: imageUrls[Math.floor(Math.random() * imageUrls.length)],
        tags: [],
        comments: [],
      };

      testData.push(postData);
    }

    await postModel.insertMany({ insertDict: testData });

    console.log('Test data generated and inserted successfully!');
  } catch (error) {
    console.error('Error generating test data:', error);
  }
};

generateTestData();

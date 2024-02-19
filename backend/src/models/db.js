const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGODB_URI, {
    autoIndex: true,
  })
  .then(() => {
    console.log('Mongo connected!');
  })
  .catch((err) => {
    console.log(err);
    process.exit(-1);
  });

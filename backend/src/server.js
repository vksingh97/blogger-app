require('dotenv').config();
const express = require('express');
const routes = require('./routes/routes');
const path = require('path');
const responseHandlers = require('./middlewares/response');
require('./models/db');
require('./redisClient');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.text({ limit: '25mb' }));
app.use(express.json({ limit: '1mb' }));
app.use(responseHandlers);
app.use(routes);
app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

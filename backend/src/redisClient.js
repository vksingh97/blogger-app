const Redis = require('ioredis');

const redisClient = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_KEY,
  password: process.env.REDIS_PASSWORD,
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Error connecting to Redis:', err);
});

module.exports = redisClient;

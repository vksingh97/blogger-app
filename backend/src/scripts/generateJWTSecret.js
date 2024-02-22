const crypto = require('crypto');

const JWT_SECRET = crypto.randomBytes(32).toString('hex');
console.log('JWT_SECRET:', JWT_SECRET);

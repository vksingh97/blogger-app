const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const tokenCookie = req.headers.cookie;
  if (!tokenCookie) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const tokenMatch = tokenCookie.match(/authToken=([^;]*)/);
  if (!tokenMatch || !tokenMatch[1]) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = tokenMatch[1];

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden: Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

module.exports = authenticateToken;

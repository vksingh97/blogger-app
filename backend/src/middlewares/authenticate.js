const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const tokenCookie = req.cookies.authToken;

  if (!tokenCookie) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  jwt.verify(tokenCookie, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden: Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

module.exports = authenticateToken;

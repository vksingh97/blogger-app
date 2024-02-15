const router = require('express').Router();

router.get('/', (_req, res) => res.send('Welcome to Blogger App!'));

module.exports = router;

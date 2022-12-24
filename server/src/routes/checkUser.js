const router = require('express').Router();

router.get('/', (req, res) => {
  const {
    user, userRole, userId, userPassword,
  } = req.session;
  if (req.session.user) {
    res.json({
      name: user, role: userRole, id: userId, password: userPassword,
    });
  }
  res.end();
});

module.exports = router;

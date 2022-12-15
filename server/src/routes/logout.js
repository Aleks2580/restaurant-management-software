const router = require('express').Router();

router.get('/', (req, res) => {
  if (req.session.user) {
    req.session.destroy(() => {
      res.clearCookie('SessionRestaurant');
      res.sendStatus(200);
    })
  } else res.sendStatus(400);
});

module.exports = router;
const router = require('express').Router();
const { User } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({ raw: true });
    res.json({ users });
  } catch (error) {
    res.send(`Error while loading users! ${error}`);
  }
});

module.exports = router;

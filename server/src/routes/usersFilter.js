const router = require('express').Router();
const { User } = require('../../db/models');

router.post('/', async (req, res) => {
  const { role } = req.body;
  if (role === 'all') {
    try {
      const roles = await User.findAll({ raw: true });
      res.json({ roles });
    } catch (error) {
      res.json(`Something went wrong ${error}`);
    }
  } else {
    try {
      const roles = await User.findAll({ where: { role } });
      res.json({ roles });
    } catch (error) {
      res.json(`Something went wrong ${error}`);
    }
  }
});

module.exports = router;

const router = require('express').Router();
const { User } = require('../../db/models');

router.delete('/', async (req, res) => {
  const { id } = req.body;
  try {
    await User.destroy({ where: { id } });
    res.json('Done')
  } catch (error) {
    res.json(`Error while deleting user ${error}`);
  }
});

module.exports = router;

const router = require('express').Router();
const { User } = require('../../db/models');

router.put('/', async (req, res) => {
  const { fullName, password, role, id} = req.body
  try {
    await User.update({ fullName, password, role }, { where: { id } });
    res.json('Done')
  } catch (error) {
    res.json(`Error while editing user ${error}`);
  }
});

module.exports = router;
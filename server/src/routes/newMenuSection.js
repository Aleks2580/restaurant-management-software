const router = require('express').Router();
const { MenuSection } = require('../../db/models');

router.post('/', async (req, res) => {
  const { name } = req.body;

  try {
    await MenuSection.create({ name });
    res.json('Done')
  } catch (error) {
    res.json(`Error while creating new section ${error}`);
  }
});

module.exports = router;

const router = require('express').Router();
const { MenuSection } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const sections = await MenuSection.findAll({ raw: true });
    res.json({ sections });
  } catch (error) {
    res.send(`Error while loading sections! ${error}`);
  }
});

module.exports = router;
const router = require('express').Router();
const { MenuCategory, MenuSection } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const categories = await MenuCategory.findAll({ raw: true });
    const sections = await MenuSection.findAll({ raw: true });
    res.json({ categories, sections });
  } catch (error) {
    res.send(`Error while loading categories! ${error}`);
  }
});

module.exports = router;
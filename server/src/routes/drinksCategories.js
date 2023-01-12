const router = require('express').Router();
const { MenuCategory } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const categories = await MenuCategory.findAll({ where: { menuSectionId: 2 }, raw: true });
    res.json({ categories });
  } catch (error) {
    res.send(`Error while loading categories! ${error}`);
  }
});

module.exports = router;
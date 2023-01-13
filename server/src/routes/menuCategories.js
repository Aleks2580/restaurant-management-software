const router = require('express').Router();
const { MenuCategory } = require('../../db/models');

router.post('/', async (req, res) => {
  console.log(req.body);
  const menuSectionId = +req.body.id;
  try {
    const categories = await MenuCategory.findAll({ where: { menuSectionId }, raw: true });
    res.json({ categories });
  } catch (error) {
    res.send(`Error while loading categories! ${error}`);
  }
});

module.exports = router;
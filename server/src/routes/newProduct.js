const router = require('express').Router();
const { Item } = require('../../db/models');

router.post('/', async (req, res) => {
  const { name } = req.body;
  const menuSectionId = +req.body.menuSectionId;
  const categoryId = +req.body.categoryId;
  const priceUSD = +req.body.priceUSD;

  try {
    await Item.create({ name, menuSectionId, categoryId, priceUSD });
    res.json('Done');
  } catch (error) {
    res.json(`Error while creating new category ${error}`);
  }
});

module.exports = router;
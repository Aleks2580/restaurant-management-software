const router = require('express').Router();
const { Item } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const products = await Item.findAll({ raw: true });
    res.json({ products });
  } catch (error) {
    res.send(`Error while loading products! ${error}`);
  }
});

module.exports = router;
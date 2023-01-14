const router = require('express').Router();
const { Item } = require('../../db/models');

router.post('/', async (req, res) => {
  const categoryId = +req.body.categoryId;
  try {
    const items = await Item.findAll({ where: { categoryId }, raw: true });
    res.json({ items });
  } catch (error) {
    res.send(`Error while loading items! ${error}`);
  }
});

module.exports = router;
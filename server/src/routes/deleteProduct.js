const router = require('express').Router();
const { Item } = require('../../db/models');

router.delete('/', async (req, res) => {
  const { id } = req.body;
  try {
    await Item.destroy({ where: { id } });
    res.json('Done')
  } catch (error) {
    res.json(`Error while deleting product ${error}`);
  }
});

module.exports = router;
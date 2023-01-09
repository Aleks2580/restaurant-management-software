const router = require('express').Router();
const { Table } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const orders = await Table.findAll({ where: { available: false }, raw: true });
    res.json({ orders });
  } catch (error) {
    res.send(`Error while loading tables! ${error}`);
  }
});

module.exports = router;
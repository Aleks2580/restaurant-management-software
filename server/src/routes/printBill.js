const router = require('express').Router();
const { Order, Table } = require('../../db/models');

router.post('/', async (req, res) => {
  const { tableNumber } = req.body;
  try {
    await Order.update({ billPrinted: true }, { where: { tableNumber, open: true } });
    await Table.update({ billPrinted: true }, { where: { number: tableNumber, available: false } });
    res.json('Done');
  } catch (error) {
    res.json(`Error while printing bill ${error}`);
  }
});

module.exports = router;

const router = require('express').Router();
const { Order, Table } = require('../../db/models');

router.post('/', async (req, res) => {
  const { tableNumber, billPrinted } = req.body;

  try {
    await Order.update({ billPrinted }, { where: { tableNumber, open: true } });
    await Table.update({ billPrinted }, 
      { where: { number: tableNumber, available: false } });
    res.json('Done');
  } catch (error) {
    res.json(`Error while printing bill ${error}`);
  }
});

module.exports = router;

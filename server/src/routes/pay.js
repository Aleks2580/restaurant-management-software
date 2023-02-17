const router = require('express').Router();
const { Order, Table } = require('../../db/models');

router.post('/', async (req, res) => {
  const { tableNumber, open, available, billPrinted } = req.body;
  try {
    await Order.update({ open }, { where: { tableNumber, open: true } });
    await Table.update(
      { available, billPrinted },
      { where: { number: tableNumber, available: false } },
    );
    res.json('Done');
  } catch (error) {
    res.json(`Error while paying ${error}`);
  }
});

module.exports = router;

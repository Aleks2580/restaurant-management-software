const router = require('express').Router();
const { Order, Table } = require('../../db/models');

router.post('/', async (req, res) => {
  const { waiterName, waiterId, tableNumber, guests, total, open } = req.body;
  const items = JSON.stringify(req.body.items);
  try {
    await Order.create({ waiterName, waiterId, tableNumber, guests, total, items, open });
    await Table.update({ available: false }, { where: { number: tableNumber } });
   res.json('Done')
  } catch (error) {
    res.json(`Error while creating order ${error}`);
  }
});

module.exports = router;
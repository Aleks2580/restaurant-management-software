const router = require('express').Router();
const { Order } = require('../../db/models');

router.post('/', async (req, res) => {
  const { waiterName, waiterId, tableNumber, guests, total, open } = req.body;
  const items = JSON.stringify(req.body.items);
  try {
    await Order.create({ waiterName, waiterId, tableNumber, guests, total, items, open });
   res.json('Done')
  } catch (error) {
    res.json(`Error while creating order ${error}`);
  }
});

module.exports = router;
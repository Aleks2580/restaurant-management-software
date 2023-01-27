const router = require('express').Router();
const { Order } = require('../../db/models');

router.post('/', async (req, res) => {
  console.log(req.body);
  const { waiterName, waiterId, tableNumber, guests, items, total } = req.body;;
  try {
    await Order.create({ waiterName});
   res.json('Done')
  } catch (error) {
    res.json(`Error while creating order ${error}`);
  }
});

module.exports = router;
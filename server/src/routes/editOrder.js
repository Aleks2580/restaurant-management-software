const router = require('express').Router();
const { Order } = require('../../db/models');

router.put('/', async (req, res) => {
  //console.log(req.body);
  const {
    waiterName, waiterId, tableNumber, guests, total,
  } = req.body;
  const items = JSON.stringify(req.body.items);
  try {
    await Order.update({
      waiterName, waiterId, tableNumber, guests, total, items,
    }, { where: { tableNumber, open: true } });
    res.json('Done');
  } catch (error) {
    res.json(`Error while editing order ${error}`);
  }
});

module.exports = router;

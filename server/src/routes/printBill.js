const router = require('express').Router();
const { Order } = require('../../db/models');

router.post('/', async (req, res) => {
  const { tableNumber } = req.body;
  try {
    await Order.update({ billPrinted: true }, { where: { tableNumber, open: true } });
    res.json('Done');
  } catch (error) {
    res.json(`Error while printing bill ${error}`);
  }
});

module.exports = router;

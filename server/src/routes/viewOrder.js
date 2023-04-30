const router = require("express").Router();
const { Order } = require("../../db/models");

router.post("/", async (req, res) => {
  const { tableNumber } = req.body;

  try {
    const order = await Order.findOne({
      where: { tableNumber, open: true },
      raw: true,
    });
    order.items = JSON.parse(order.items);
    res.json({ order });
  } catch (error) {
    res.json(`Something went wrong ${error} `);
  }
});

module.exports = router;

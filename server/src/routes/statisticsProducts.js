const router = require("express").Router();
const { Order, Item, MenuSection, MenuCategory } = require("../../db/models");

router.get("/", async (req, res) => {
  try {
    // Get all orders from the database, including the 'items' column
    const orders = await Order.findAll({
      attributes: ["items"],
      raw: true,
    });

    const itemsData = [];
    orders.forEach((order) => {
      const items = JSON.parse(order.items);
      items.forEach((orderItem) => {
        const { item, quantity, price } = orderItem;
        const itemData = itemsData.find((data) => data.name === item);
        if (itemData) {
          itemData.quantity += quantity;
          itemData.total += quantity * price;
        } else {
          itemsData.push({
            name: item,
            quantity,
            total: quantity * price,
          });
        }
      });
    });

    itemsData.sort((a, b) => b.quantity - a.quantity);

    console.log(itemsData);
    res.json({ itemsData });
  } catch (error) {
    res.send(`Error while loading data! ${error}`);
  }
});

module.exports = router;

const router = require("express").Router();
const { Order, Item, MenuSection, MenuCategory } = require("../../db/models");

// router.get("/", async (req, res) => {
//   try {
//     // Get all orders from the database, including the 'items' column
//     const orders = await Order.findAll({
//       attributes: ["items"],
//       raw: true,
//     });

//     const itemsData = {};
//     orders.forEach((order) => {
//       order.items.forEach((orderItem) => {
//         const { item, quantity, price } = orderItem;
//         if (!itemsData[item]) {
//           itemsData[item] = { quantity: 0, total: 0 };
//         }
//         itemsData[item].quantity += quantity;
//         itemsData[item].total += quantity * price;
//       });
//     });
//     console.log("ITEMS", itemsData);

//     //res.json({ orders });
//   } catch (error) {
//     res.send(`Error while loading data! ${error}`);
//   }
// });

router.get("/", async (req, res) => {
  try {
    // Get all orders from the database, including the 'items' column
    const orders = await Order.findAll({
      attributes: ["items"],
      raw: true,
    });

    console.log("ITEMS", orders);

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
    console.log("ITEMS", itemsData);

    res.json({ itemsData });
  } catch (error) {
    res.send(`Error while loading data! ${error}`);
  }
});

module.exports = router;

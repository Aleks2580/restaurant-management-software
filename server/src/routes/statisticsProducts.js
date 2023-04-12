const router = require("express").Router();
const { Order, Item, MenuSection, MenuCategory } = require("../../db/models");

router.get("/", async (req, res) => {
  try {
    const orders = await Order.findAll({
      attributes: ["items"],
      raw: true,
    });

    const products = await Item.findAll({
      attributes: ["name"],
      include: [
        {
          model: MenuSection,
          attributes: ["name"],
        },
        {
          model: MenuCategory,
          attributes: ["name"],
        },
      ],
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

    const itemsMap = new Map();
    itemsData.forEach((item) => {
      itemsMap.set(item.name, item);
    });

    const finalData = [];

    products.forEach((product) => {
      const item = itemsMap.get(product.name);
      if (item) {
        finalData.push({
          ...item,
          MenuSection: { name: product["MenuSection.name"] },
          MenuCategory: { name: product["MenuCategory.name"] },
        });
      } else {
        finalData.push({
          name: product.name,
          quantity: 0,
          total: 0,
          MenuSection: { name: product["MenuSection.name"] },
          MenuCategory: { name: product["MenuCategory.name"] },
        });
      }
    });
    finalData.sort((a, b) => b.quantity - a.quantity);

    const sections = [
      ...new Set(finalData.map((item) => item.MenuSection.name)),
    ];
    const categories = [
      ...new Set(finalData.map((item) => item.MenuCategory.name)),
    ];

    const sectionTotals = sections.map((section) => {
      const itemsInSection = finalData.filter(
        (item) => item.MenuSection.name === section
      );
      const totalQuantity = itemsInSection.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      const totalAmount = itemsInSection.reduce(
        (acc, item) => acc + item.total,
        0
      );
      return { name: section, quantity: totalQuantity, total: totalAmount };
    });
    const categoryTotals = categories.map((category) => {
      const itemsInCategory = finalData.filter(
        (item) => item.MenuCategory.name === category
      );
      const totalQuantity = itemsInCategory.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      const totalAmount = itemsInCategory.reduce(
        (acc, item) => acc + item.total,
        0
      );
      return { name: category, quantity: totalQuantity, total: totalAmount };
    });

    res.json({ finalData, sectionTotals, categoryTotals });
  } catch (error) {
    res.send(`Error while loading data! ${error}`);
  }
});

module.exports = router;

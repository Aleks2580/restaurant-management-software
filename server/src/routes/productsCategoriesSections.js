const router = require("express").Router();
const { MenuCategory, MenuSection, Item } = require("../../db/models");

router.get("/", async (req, res) => {
  try {
    const categories = await MenuCategory.findAll({ raw: true });
    const sections = await MenuSection.findAll({ raw: true });
    const products = await Item.findAll({ raw: true });
    res.json({ categories, sections, products });
  } catch (error) {
    res.send(`Error while loading categories! ${error}`);
  }
});

module.exports = router;

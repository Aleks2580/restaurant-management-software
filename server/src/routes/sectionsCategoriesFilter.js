const router = require("express").Router();
const { MenuCategory, Item } = require("../../db/models");

router.post("/", async (req, res) => {
  const { menuSectionId } = req.body.data;
  const { categoryId } = req.body.data;
  if (menuSectionId === "") {
    try {
      const products = await Item.findAll({ raw: true });
      const categories = [];
      res.json({ products, categories });
    } catch (error) {
      res.json(`Something went wrong ${error}`);
    }
  } else if (menuSectionId && categoryId === "") {
    try {
      const products = await Item.findAll({
        where: { menuSectionId },
        raw: true,
      });
      const categories = await MenuCategory.findAll({
        where: { menuSectionId },
        raw: true,
      });
      res.json({ products, categories });
    } catch (error) {
      res.json(`Something went wrong ${error}`);
    }
  } else if (menuSectionId && categoryId) {
    try {
      const products = await Item.findAll({
        where: { menuSectionId, categoryId },
        raw: true,
      });
      const categories = await MenuCategory.findAll({
        where: { menuSectionId },
        raw: true,
      });
      res.json({ products, categories });
    } catch (error) {
      res.json(`Something went wrong ${error}`);
    }
  } else {
    try {
      const products = await Item.findAll({ raw: true });
      const categories = [];
      res.json({ products, categories });
    } catch (error) {
      res.json(`Something went wrong ${error}`);
    }
  }
});

module.exports = router;

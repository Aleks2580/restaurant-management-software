const router = require("express").Router();
const { Op } = require("sequelize");
const { Item, MenuSection, MenuCategory } = require("../../db/models");

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const products = await Item.findAll({
      offset,
      limit,
      raw: true,
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
    });
    res.json({ products });
  } catch (error) {
    res.send(`Error while loading products! ${error}`);
  }
});

module.exports = router;

router.post("/", async (req, res) => {
  const { section, category } = req.body.filter;
  if (section !== "all" && category !== "all") {
    try {
      const categories = await MenuCategory.findAll({
        raw: true,
        include: {
          model: MenuSection,
          attributes: ["name"],
          where: { name: section },
        },
      });
      const products = await Item.findAll({
        raw: true,
        include: [
          {
            model: MenuSection,
            attributes: ["name"],
            where: { name: section },
          },
          {
            model: MenuCategory,
            attributes: ["name"],
            where: {
              name: category,
            },
          },
        ],
      });
      res.json({ products, categories });
    } catch (error) {
      res.send(`Error while loading products! ${error}`);
    }
  } else if (section === "all" && category !== "all") {
    try {
      const categories = await MenuCategory.findAll({
        raw: true,
      });
      const products = await Item.findAll({
        raw: true,
        include: [
          {
            model: MenuSection,
            attributes: ["name"],
          },
          {
            model: MenuCategory,
            attributes: ["name"],
            where: {
              name: category,
            },
          },
        ],
      });
      res.json({ products, categories });
    } catch (error) {
      res.send(`Error while loading products! ${error}`);
    }
  } else if (section !== "all" && category === "all") {
    try {
      const categories = await MenuCategory.findAll({
        raw: true,
        include: {
          model: MenuSection,
          attributes: ["name"],
          where: { name: section },
        },
      });
      const products = await Item.findAll({
        raw: true,
        include: [
          {
            model: MenuSection,
            attributes: ["name"],
            where: { name: section },
          },
          {
            model: MenuCategory,
            attributes: ["name"],
          },
        ],
      });
      res.json({ products, categories });
    } catch (error) {
      res.send(`Error while loading products! ${error}`);
    }
  } else {
    try {
      const categories = await MenuCategory.findAll({
        raw: true,
      });
      const products = await Item.findAll({
        raw: true,
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
      });
      res.json({ products, categories });
    } catch (error) {
      res.send(`Error while loading products! ${error}`);
    }
  }
});

module.exports = router;

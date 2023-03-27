const router = require("express").Router();
const { Op } = require("sequelize");
const { Item, MenuSection, MenuCategory } = require("../../db/models");

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 20;
  const offset = (page - 1) * pageSize;
  const limit = pageSize;
  const section = req.query.section || null;
  const category = req.query.category || null;

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
        offset,
        limit,
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

      const totalCount = await Item.count({
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
      res.json({ products, categories, totalCount });
    } catch (error) {
      res.send(`Error while loading products! ${error}`);
    }
  } else if (section === "all" && category !== "all") {
    try {
      const categories = await MenuCategory.findAll({
        raw: true,
        include: {
          model: MenuSection,
          attributes: ["name"],
        },
        where: { name: category },
      });
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
            where: {
              name: category,
            },
          },
        ],
      });
      const totalCount = await Item.count({
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

      res.json({ products, categories, totalCount });
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
        offset,
        limit,
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
      const totalCount = await Item.count({
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
            include: {
              model: MenuSection,
              attributes: [],
              where: { name: section },
            },
          },
        ],
      });

      res.json({ products, categories, totalCount });
    } catch (error) {
      res.send(`Error while loading products! ${error}`);
    }
  } else {
    try {
      const categories = await MenuCategory.findAll({
        raw: true,
      });
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
      const totalCount = await Item.count();
      res.json({ products, categories, totalCount });
    } catch (error) {
      res.send(`Error while loading products! ${error}`);
    }
  }
});

module.exports = router;

router.post("/", async (req, res) => {
  const { section, category } = req.body.filter;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 20;
  const offset = (page - 1) * pageSize;
  const limit = pageSize;
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
        offset,
        limit,
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

      const totalCount = await Item.count({
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
      res.json({ products, categories, totalCount });
    } catch (error) {
      res.send(`Error while loading products! ${error}`);
    }
  } else if (section === "all" && category !== "all") {
    try {
      const categories = await MenuCategory.findAll({
        raw: true,
        include: {
          model: MenuSection,
          attributes: ["name"],
        },
        where: { name: category },
      });
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
            where: {
              name: category,
            },
          },
        ],
      });
      const totalCount = await Item.count({
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
      res.json({ products, categories, totalCount });
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
        offset,
        limit,
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
      const totalCount = await Item.count({
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
            include: {
              model: MenuSection,
              attributes: [],
              where: { name: section },
            },
          },
        ],
      });
      res.json({ products, categories, totalCount });
    } catch (error) {
      res.send(`Error while loading products! ${error}`);
    }
  } else {
    try {
      const categories = await MenuCategory.findAll({
        raw: true,
      });
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
      const totalCount = await Item.count();
      res.json({ products, categories, totalCount });
    } catch (error) {
      res.send(`Error while loading products! ${error}`);
    }
  }
});

module.exports = router;

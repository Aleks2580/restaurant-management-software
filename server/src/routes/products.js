const router = require("express").Router();
const { Op } = require("sequelize");
const { Item, MenuSection, MenuCategory } = require("../../db/models");

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 20;
  console.log("PAGE", page);
  const offset = (page - 1) * pageSize;
  const limit = pageSize;
  const section = req.query.section || null;
  const category = req.query.category || null;
  //console.log("CATEGORY SECTION", category, section);

  //   const totalCount = await Item.count();

  //   const products = await Item.findAll({
  //     offset,
  //     limit,
  //     raw: true,
  //     include: [
  //       {
  //         model: MenuSection,
  //         attributes: ["name"],
  //       },
  //       {
  //         model: MenuCategory,
  //         attributes: ["name"],
  //       },
  //     ],
  //   });
  //   console.log("CASE0");
  //   res.json({ products, totalCount });
  // } catch (error) {
  //   res.send(`Error while loading products! ${error}`);
  // }

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
      console.log("CASE1");
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
      console.log("CASE2", products, categories, totalCount);
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
      console.log("CASE3");
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
      console.log("CASE4");
      res.json({ products, categories, totalCount });
    } catch (error) {
      res.send(`Error while loading products! ${error}`);
    }
  }
});

// router.get("/", async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const pageSize = parseInt(req.query.pageSize) || 20;
//     const section = req.query.section || null;
//     const category = req.query.category || null;
//     console.log("PAGE", page);
//     const offset = (page - 1) * pageSize;
//     const limit = pageSize;

//     let whereClause = {};
//     if (section) {
//       whereClause = { ...whereClause, section: section };
//     }
//     if (category) {
//       whereClause = { ...whereClause, category: category };
//     }

//     const totalCount = await Item.count({
//       where: whereClause,
//     });

//     const products = await Item.findAll({
//       offset,
//       limit,
//       raw: true,
//       where: whereClause,
//       include: [
//         {
//           model: MenuSection,
//           attributes: ["name"],
//         },
//         {
//           model: MenuCategory,
//           attributes: ["name"],
//         },
//       ],
//     });
//     console.log("CASE0");
//     res.json({ products, totalCount });
//   } catch (error) {
//     //res.send(`Error while loading products! ${error}`);
//     res.status(500).json({ error: `Error while loading products! ${error}` });
//   }
// });

module.exports = router;

router.post("/", async (req, res) => {
  const { section, category } = req.body.filter;
  //console.log("SECTION:", section, "CATEGORY", category);
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 20;
  console.log("BODY", req.body);
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
      console.log("CASE1");
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
      console.log("CASE2", products, categories, totalCount);
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
      console.log("CASE3");
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
      console.log("CASE4");
      res.json({ products, categories, totalCount });
    } catch (error) {
      res.send(`Error while loading products! ${error}`);
    }
  }
});

module.exports = router;

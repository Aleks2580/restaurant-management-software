const router = require('express').Router();
const { Op } = require('sequelize');
const { Item, MenuSection, MenuCategory } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const products = await Item.findAll({
      raw: true,
      include: [
        {
          model: MenuSection,
          attributes: ['name'],
        },
        {
          model: MenuCategory,
          attributes: ['name'],
        },
      ],
    });
    res.json({ products });
  } catch (error) {
    res.send(`Error while loading products! ${error}`);
  }
});

module.exports = router;

router.post('/', async (req, res) => {
  // console.log(req.body);
  // const { name } = req.body;
  const { section, category } = req.body.filter;
  // console.log(section, category);
  if (section !== 'all' && category !== 'all') {
    try {
      const products = await Item.findAll({
        raw: true,
        include: [
          {
            model: MenuSection,
            attributes: ['name'],
            where: { name: section },
          },
          {
            model: MenuCategory,
            attributes: ['name'],
            where: {
              name: category,
            },
          },
        ],
      });
      res.json({ products });
    } catch (error) {
      res.send(`Error while loading products! ${error}`);
    }
  } else if (section === 'all' && category !== 'all') {
    try {
      const products = await Item.findAll({
        raw: true,
        include: [
          {
            model: MenuSection,
            attributes: ['name'],
          },
          {
            model: MenuCategory,
            attributes: ['name'],
            where: {
              name: category,
            },
          },
        ],
      });
      res.json({ products });
    } catch (error) {
      res.send(`Error while loading products! ${error}`);
    }
  } else if (section !== 'all' && category === 'all') {
    try {
      const products = await Item.findAll({
        raw: true,
        include: [
          {
            model: MenuSection,
            attributes: ['name'],
            where: { name: section }
          },
          {
            model: MenuCategory,
            attributes: ['name'],
          },
        ],
      });
      res.json({ products });
    } catch (error) {
      res.send(`Error while loading products! ${error}`);
    }
  } else {
    try {
      const products = await Item.findAll({
        raw: true,
        include: [
          {
            model: MenuSection,
            attributes: ['name'],
          },
          {
            model: MenuCategory,
            attributes: ['name'],
          },
        ],
      });
      res.json({ products });
    } catch (error) {
      res.send(`Error while loading products! ${error}`);
    }
  }
});

module.exports = router;

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

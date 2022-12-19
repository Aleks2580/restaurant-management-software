const router = require('express').Router();
const { Table } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const tables = await Table.findAll({ raw: true });
    res.json({ tables });
  } catch (error) {
    res.send(`Error while loading tables! ${error}`);
  }
});

module.exports = router;
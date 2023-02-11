// const router = require('express').Router();
// const { Table } = require('../../db/models');

// router.post('/', async (req, res) => {
//   const { id } = req.body;
//   console.log(id);
//   try {
//     await Table.update({ available: false }, { where: { id } });
//     res.json('Done')
//   } catch (error) {
//     res.json(`Error while editing user ${error}`);
//   }
// });

// module.exports = router;
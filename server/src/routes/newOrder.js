const router = require('express').Router();
const { Order } = require('../../db/models');

router.post('/', async (req, res) => {
  // const { fullName, password, role } = req.body;
  console.log(req.body)
  // try {
  //   await Order.create({ fullName, password, role });
  res.json('Done')
  // } catch (error) {
  //   res.json(`Error while creating user ${error}`);
  // }
});

module.exports = router;
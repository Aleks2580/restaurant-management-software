const router = require('express').Router();
const { Order, Table, User } = require('../../db/models');

router.post('/', async (req, res) => {
  const { tableNumber, billPrinted, password } = req.body;
  try {
    const checkManagerPassword = await User.findOne({ where: { password, role: 'manager' } });
    if (checkManagerPassword) {
      await Order.update({ billPrinted }, { where: { tableNumber, open: true } });
      await Table.update({ billPrinted }, 
        { where: { number: tableNumber, available: false } });
      res.json('Done');
    } else {
      res.json('Password is incorrect');
    }
  } catch (error) {
    res.json(`Error while printing/cancelling bill ${error}`);
  }
});

module.exports = router;
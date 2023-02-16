const router = require('express').Router();
const { Order, Table, User } = require('../../db/models');

router.post('/', async (req, res) => {
  const { tableNumber, billPrinted, password } = req.body;
  //console.log('BODYYYY', req.body)
  try {
    const checkManagerPassword = await User.findOne({ where: { password, role: 'manager' } });
    console.log('CHECKPASSWORD', checkManagerPassword)
    await Order.update({ billPrinted }, { where: { tableNumber, open: true } });
    await Table.update({ billPrinted }, 
      { where: { number: tableNumber, available: false } });
    res.json('Done');
  } catch (error) {
    res.json(`Error while printing/cancelling bill ${error}`);
  }
});

module.exports = router;
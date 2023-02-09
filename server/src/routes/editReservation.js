const router = require('express').Router();
const { Reservation } = require('../../db/models');

router.put('/', async (req, res) => {
  
  const { date, time, name, guests, phone, id} = req.body;
  try {
    await Reservation.update({ date, time, name, guests, phone }, { where: { id } });
    res.json('Done')
  } catch (error) {
    res.json(`Error while editing reservation ${error}`);
  }
});

module.exports = router;
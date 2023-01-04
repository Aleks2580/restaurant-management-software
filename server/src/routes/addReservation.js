const router = require('express').Router();
const { Reservation } = require('../../db/models');

router.post('/', async (req, res) => {
  const {
    name, guests, phone, date, time,
  } = req.body;

  try {
    await Reservation.create({
      date, time, name, guests, phone,
    });
    res.json('Done');
  } catch (error) {
    res.json(`Error while creating reservation ${error}`);
  }
});

module.exports = router;

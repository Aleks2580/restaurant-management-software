const router = require('express').Router();
const { Reservation } = require('../../db/models');

router.post('/', async (req, res) => {
  const {
    name, guests, date, time,
  } = req.body;

  try {
    await Reservation.create({
      date, time, name, guests,
    });
    res.json('Done');
  } catch (error) {
    res.json(`Error while creating reservation ${error}`);
  }
});

module.exports = router;

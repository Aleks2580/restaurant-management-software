const router = require('express').Router();
const { Reservation } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const data = await Reservation.findAll({ raw: true });
    res.json({ data });
  } catch (error) {
    res.send(`Error while loading reservations! ${error}`);
  }
});

module.exports = router;

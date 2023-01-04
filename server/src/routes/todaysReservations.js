const router = require('express').Router();
const { Reservation } = require('../../db/models');

router.get('/', async (req, res) => {
  const date = new Date().toISOString().split('T')[0];

  try {
    const data = await Reservation.findAll({ where: { date }, raw: true });
    console.log(data.length);
    res.json({ data });
  } catch (error) {
    res.send(`Error while loading reservations! ${error}`);
  }
});

module.exports = router;
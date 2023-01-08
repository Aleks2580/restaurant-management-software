const router = require('express').Router();
const { Reservation } = require('../../db/models');

router.post('/', async (req, res) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const { date } = req.body;

  if (date === 'all') {
    try {
      const datesFromBack = await Reservation.findAll({ raw: true });
      const dates = datesFromBack.filter((el) => new Date(el.date) > today)
      res.json({ dates });
    } catch (error) {
      res.json(`Something went wrong ${error}`);
    }
  } else {
    try {
      const dates = await Reservation.findAll({ where: { date } });
      res.json({ dates });
    } catch (error) {
      res.json(`Something went wrong ${error}`);
    }
  }
});

module.exports = router;
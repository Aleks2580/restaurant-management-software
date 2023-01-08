const router = require('express').Router();
const { Reservation } = require('../../db/models');

router.get('/', async (req, res) => {
  const today = new Date().setHours(0, 0, 0, 0);

  try {
    const dataFromBack = await Reservation.findAll({ raw: true });
    const data = dataFromBack.filter((el) => new Date(el.date) > today);
    res.json({ data });
  } catch (error) {
    res.send(`Error while loading reservations! ${error}`);
  }
});

module.exports = router;

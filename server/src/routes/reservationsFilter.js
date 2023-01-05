const router = require('express').Router();
const { Reservation } = require('../../db/models');

router.post('/', async (req, res) => {
  const { date } = req.body;
  //const roleUser = role.all;
  console.log(req.body);

  if (date === 'all') {
    try {
      const dates = await Reservation.findAll({ raw: true });
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
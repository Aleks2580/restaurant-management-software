const router = require('express').Router();
const { Reservation } = require('../../db/models');

router.delete('/', async (req, res) => {
  const { id } = req.body;
  console.log(id);
  // try {
  //   await Reservation.destroy({ where: { id } });
  //   res.json('Done')
  // } catch (error) {
  //   res.json(`Error while deleting user ${error}`);
  // }
});

module.exports = router;
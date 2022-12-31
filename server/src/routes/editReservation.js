const router = require('express').Router();
const { Reservation } = require('../../db/models');

router.post('/', async (req, res) => {
  // const { fullName, password, role, id} = req.body
  // try {
  //   await Reservation.update({ fullName, password, role }, { where: { id } });
  //   res.json('Done')
  // } catch (error) {
  //   res.json(`Error while editing user ${error}`);
  // }
});

module.exports = router;
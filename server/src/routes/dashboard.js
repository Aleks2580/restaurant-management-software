const router = require('express').Router();
const { Order, Reservation } = require('../../db/models');

router.get('/', async (req, res) => {
  //const today = new Date().setHours(0, 0, 0, 0);
  let activeOrdersTotal = 0;
  let activeOrdersGuests = 0;
  let activeOrdersAverageCheck;
  

  try {
    const activeOrders = await Order.findAll({ where: { open: true }, raw: true });
    activeOrders.forEach((activeOrder) => {
     activeOrdersTotal += activeOrder.total;
     activeOrdersGuests += activeOrder.guests;
    })
    activeOrdersAverageCheck = Math.round(activeOrdersTotal / activeOrders.length);
    //console.log(activeOrdersTotal, activeOrdersGuests, activeOrdersAverageCheck)
    // const dataFromBack = await Reservation.findAll({ raw: true });
    // const data = dataFromBack.filter((el) => new Date(el.date) >= today);
    res.json({ activeOrdersAverageCheck, activeOrdersTotal, activeOrdersGuests });
  } catch (error) {
    res.send(`Error while loading data! ${error}`);
  }
});

module.exports = router;
const router = require('express').Router();
const { Order, Reservation } = require('../../db/models');

router.get('/', async (req, res) => {
  const today = (new Date().setHours(0, 0, 0, 0));
  let activeOrdersTotal = 0;
  let activeOrdersGuests = 0;
  let activeOrdersAverageCheck = 0;
  let totalOrdersTotal = 0;
  let totalOrdersGuests = 0;
  let totalOrdersAverageCheck = 0;
  let totalPaidOrdersTotal = 0;
  let totalPaidOrdersGuests = 0;
  let totalPaidOrdersAverageCheck = 0;

  try {
    const activeOrders = await Order.findAll({ where: { open: true }, raw: true });
    activeOrders.forEach((activeOrder) => {
      activeOrdersTotal += activeOrder.total;
      activeOrdersGuests += activeOrder.guests;
      // console.log(activeOrder.createdAt.toDateString());
      // console.log(new Date(today).toDateString());
      // console.log(today)
    });
    activeOrdersAverageCheck = Math.round(activeOrdersTotal / activeOrders.length);

    const totalOrdersFromBack = await Order.findAll({ raw: true });
    const totalOrders = totalOrdersFromBack
      .filter((order) => order.createdAt.toDateString() === new Date(today).toDateString());
    totalOrders.forEach((order) => {
      totalOrdersTotal += order.total;
      totalOrdersGuests += order.guests;
    });
    totalOrdersAverageCheck = Math.round(totalOrdersTotal / totalOrders.length);

    const paidOrders = totalOrdersFromBack.filter((order) => order.createdAt.toDateString() === new Date(today).toDateString() && order.open === false && order.billPrinted === true);
    paidOrders.forEach((paidOrder) => {
      totalPaidOrdersTotal += paidOrder.total;
      totalPaidOrdersGuests += paidOrder.guests;
    });

    totalPaidOrdersAverageCheck = Math.round(totalPaidOrdersTotal / paidOrders.length);
    //console.log(totalPaidOrdersTotal, totalPaidOrdersGuests, totalPaidOrdersAverageCheck);
    // const dataFromBack = await Reservation.findAll({ raw: true });
    // const data = dataFromBack.filter((el) => new Date(el.date) >= today);
    // console.log(totalOrdersTotal, totalOrdersGuests, totalOrdersAverageCheck);
    res.json({
      activeOrdersAverageCheck,
      activeOrdersTotal,
      activeOrdersGuests,
      totalOrdersTotal,
      totalOrdersGuests,
      totalOrdersAverageCheck,
      totalPaidOrdersAverageCheck,
      totalPaidOrdersGuests,
      totalPaidOrdersTotal,
    });
  } catch (error) {
    res.send(`Error while loading data! ${error}`);
  }
});

module.exports = router;

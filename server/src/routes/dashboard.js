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
  let reservationsTables = 0;
  let reservationsGuests = 0;
  let projectedRevenue = 0;

  try {
    const activeOrders = await Order.findAll({ where: { open: true }, raw: true });
    activeOrders.forEach((activeOrder) => {
      activeOrdersTotal += activeOrder.total;
      activeOrdersGuests += activeOrder.guests;
    });
    activeOrdersAverageCheck = Math.round(activeOrdersTotal / activeOrders.length);
    let activeOrdersTables = activeOrders.length;

    const totalOrdersFromBack = await Order.findAll({ raw: true });
    const totalOrders = totalOrdersFromBack
      .filter((order) => order.createdAt.toDateString() === new Date(today).toDateString());
    totalOrders.forEach((order) => {
      totalOrdersTotal += order.total;
      totalOrdersGuests += order.guests;
    });
    totalOrdersAverageCheck = Math.round(totalOrdersTotal / totalOrders.length);
    let totalOrdersTables = totalOrders.length;

    const paidOrders = totalOrdersFromBack.filter((order) => order.createdAt.toDateString() === new Date(today).toDateString() && order.open === false && order.billPrinted === true);
    paidOrders.forEach((paidOrder) => {
      totalPaidOrdersTotal += paidOrder.total;
      totalPaidOrdersGuests += paidOrder.guests;
    });

    totalPaidOrdersAverageCheck = Math.round(totalPaidOrdersTotal / paidOrders.length);
    let totalPaidOrdersTables = paidOrders.length;

    const reservationsFromBack = await Reservation.findAll({ raw: true });
    const reservations = reservationsFromBack.filter((reservation) => new Date(reservation.date).setHours(0, 0, 0, 0) === today);

    reservationsTables = reservations.length;
    projectedRevenue = reservationsTables * totalOrdersAverageCheck;
    reservations.forEach((reservation) => {
      reservationsGuests += +reservation.guests;
    });

    res.json({
      activeOrdersAverageCheck,
      activeOrdersTotal,
      activeOrdersGuests,
      activeOrdersTables,
      totalOrdersTotal,
      totalOrdersGuests,
      totalOrdersAverageCheck,
      totalOrdersTables,
      totalPaidOrdersAverageCheck,
      totalPaidOrdersGuests,
      totalPaidOrdersTotal,
      totalPaidOrdersTables,
      reservationsTables,
      projectedRevenue,
      reservationsGuests,

    });
  } catch (error) {
    res.send(`Error while loading data! ${error}`);
  }
});

module.exports = router;

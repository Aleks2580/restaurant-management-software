const router = require("express").Router();
const { Order } = require("../../db/models");

router.post("/", async (req, res) => {
  // const today = new Date().setHours(0, 0, 0, 0);
  // try {
  //   const dataFromBack = await Order.findAll({ raw: true });
  //   const data = dataFromBack.filter((el) => new Date(el.date) > today);
  //   res.json({ data });
  // } catch (error) {
  //   res.send(`Error while loading reservations! ${error}`);
  // }
});

module.exports = router;

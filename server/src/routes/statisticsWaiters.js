const router = require("express").Router();
const Sequelize = require("sequelize");

const { Op } = Sequelize;
const { Order } = require("../../db/models");

router.post("/", async (req, res) => {
  const {
    filterAndDates: {
      waiterName,
      dateRange: [startDate, endDate],
    },
  } = req.body;

  console.log(waiterName);

  if (waiterName) {
    try {
      const data = await Order.findAll({
        // attributes: [
        //   [
        //     Sequelize.fn("TO_CHAR", Sequelize.col("createdAt"), "YYYY-MM-DD"),
        //     "date",
        //   ],

        //   [Sequelize.fn("SUM", Sequelize.col("guests")), "totalGuests"],
        //   [Sequelize.fn("SUM", Sequelize.col("total")), "totalRevenue"],
        // ],

        // group: ["waiterName"],
        raw: true,
      });
      console.log("DATA", data);
      res.json({ data });
    } catch (error) {
      res.send(`Error while loading data! ${error}`);
    }
  }
});

module.exports = router;

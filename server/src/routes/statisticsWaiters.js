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

  if (waiterName === "all" && !startDate && !endDate) {
    try {
      const data = await Order.findAll({
        attributes: [
          [
            Sequelize.fn("TO_CHAR", Sequelize.col("createdAt"), "YYYY-MM-DD"),
            "date",
          ],
          "waiterName",
          [Sequelize.fn("sum", Sequelize.col("guests")), "totalGuests"],
          [Sequelize.fn("sum", Sequelize.col("total")), "totalAmount"],
        ],
        group: ["date", "waiterName"],
        order: [["date", "ASC"]],
        raw: true,
      });
      res.json({ data });
    } catch (error) {
      res.send(`Error while loading data! ${error}`);
    }
  } else if (waiterName !== "all" && startDate && startDate) {
    try {
      const data = await Order.findAll({
        where: {
          waiterName,
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
        attributes: [
          [
            Sequelize.fn("TO_CHAR", Sequelize.col("createdAt"), "YYYY-MM-DD"),
            "date",
          ],
          "waiterName",
          [Sequelize.fn("sum", Sequelize.col("guests")), "totalGuests"],
          [Sequelize.fn("sum", Sequelize.col("total")), "totalAmount"],
        ],
        group: ["date", "waiterName"],
        order: [["date", "ASC"]],
        raw: true,
      });
      // const data = await Order.findAll({
      //   where: { waiterName },
      //   attributes: [
      //     [
      //       Sequelize.fn("TO_CHAR", Sequelize.col("createdAt"), "YYYY-MM-DD"),
      //       "date",
      //     ],
      //     "waiterName",
      //     [Sequelize.fn("sum", Sequelize.col("guests")), "totalGuests"],
      //     [Sequelize.fn("sum", Sequelize.col("total")), "totalAmount"],
      //   ],
      //   group: ["date"],
      //   order: [["date", "ASC"]],
      //   raw: true,
      // });
      res.json({ data });
    } catch (error) {
      res.send(`Error while loading data! ${error}`);
    }
  } else {
    try {
      const data = await Order.findAll({
        where: {
          waiterName,
        },
        attributes: [
          [
            Sequelize.fn("TO_CHAR", Sequelize.col("createdAt"), "YYYY-MM-DD"),
            "date",
          ],
          "waiterName",
          [Sequelize.fn("sum", Sequelize.col("guests")), "totalGuests"],
          [Sequelize.fn("sum", Sequelize.col("total")), "totalAmount"],
        ],
        group: ["date", "waiterName"],
        order: [["date", "ASC"]],
        raw: true,
      });
      res.json({ data });
    } catch (error) {
      res.send(`Error while loading data! ${error}`);
    }
  }
});

module.exports = router;

const router = require("express").Router();
const Sequelize = require("sequelize");
const { Op } = Sequelize;
const { Order } = require("../../db/models");

router.post("/", async (req, res) => {
  const { startDate, endDate } = req.body;

  try {
    const revenue = await Order.findAll({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: [
        [
          Sequelize.fn("TO_CHAR", Sequelize.col("createdAt"), "YYYY-MM-DD"),
          "date",
        ],
        [Sequelize.fn("SUM", Sequelize.col("guests")), "totalGuests"],
        [Sequelize.fn("SUM", Sequelize.col("total")), "totalRevenue"],
      ],
      group: ["date"],
      order: Sequelize.col("date"),
      raw: true,
    });

    res.json({ revenue });
  } catch (error) {
    res.send(`Error while loading data! ${error}`);
  }
});

module.exports = router;

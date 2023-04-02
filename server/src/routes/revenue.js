const router = require("express").Router();
const Sequelize = require("sequelize");
const { Op } = Sequelize;
const { Order } = require("../../db/models");

router.post("/", async (req, res) => {
  const { startDate, endDate } = req.body;

  try {
    const perDateRevenue = await Order.findAll({
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
    const overallRevenue = await Order.findOne({
      attributes: [
        [Sequelize.literal(`SUM("guests")`), "total guests"],
        [Sequelize.literal(`SUM("total")`), "total revenue"],
      ],
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
      raw: true,
    });

    const averageCheckPerGuests = (
      overallRevenue["total revenue"] / overallRevenue["total guests"]
    ).toFixed(2);

    const revenue = {
      perDate: perDateRevenue,
      overall: overallRevenue,
      ACPG: averageCheckPerGuests,
    };

    res.json({ revenue });
  } catch (error) {
    res.send(`Error while loading data! ${error}`);
  }
});

module.exports = router;

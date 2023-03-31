const router = require("express").Router();

const { Order } = require("../../db/models");
const { Op, Sequelize } = require("sequelize");

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
        "guests",
        "total",
        [
          Sequelize.fn("date_format", Sequelize.col("createdAt"), "%Y-%m-%d"),
          "createdAt",
        ],
      ],
    });
    console.log(revenue);
    res.json({ revenue });
  } catch (error) {
    res.send(`Error while loading data! ${error}`);
  }
});

module.exports = router;

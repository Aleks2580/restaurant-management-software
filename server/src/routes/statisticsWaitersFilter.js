const router = require("express").Router();
const { User } = require("../../db/models");

router.get("/", async (req, res) => {
  try {
    const waiters = await User.findAll({
      where: { role: "waiter" },
      raw: true,
    });
    res.json({ waiters });
  } catch (error) {
    res.send(`Error while loading categories! ${error}`);
  }
});

module.exports = router;

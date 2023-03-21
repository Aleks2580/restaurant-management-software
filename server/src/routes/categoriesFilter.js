const router = require("express").Router();
const { MenuCategory } = require("../../db/models");

router.post("/", async (req, res) => {
  const { menuSectionId } = req.body;
  // const roleUser = role.all;
  // console.log(menuSectionId);
  if (menuSectionId === 0) {
    try {
      const categories = await MenuCategory.findAll({ raw: true });
      console.log(categories);
      res.json({ categories });
    } catch (error) {
      res.json(`Something went wrong ${error}`);
    }
  } else {
    try {
      const categories = await MenuCategory.findAll({
        where: { menuSectionId },
        raw: true,
      });
      console.log(categories);
      res.json({ categories });
    } catch (error) {
      res.json(`Something went wrong ${error}`);
    }
  }
});

module.exports = router;

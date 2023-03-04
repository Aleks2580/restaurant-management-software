const router = require("express").Router();
const { MenuCategory } = require("../../db/models");

router.post("/", async (req, res) => {
  const { name } = req.body;
  const menuSectionId = +req.body.menuSectionId;

  // try {
  //   await MenuCategory.create({ name });
  //   res.json('Done');
  // } catch (error) {
  //   res.json(`Error while creating new section ${error}`);
  // }
});

module.exports = router;

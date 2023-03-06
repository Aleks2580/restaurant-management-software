const router = require("express").Router();
const { MenuCategory } = require("../../db/models");

router.post("/", async (req, res) => {
  const { name } = req.body;
  const menuSectionId = +req.body.menuSectionId;

  console.log(name, menuSectionId);

  try {
    await MenuCategory.create({ name, menuSectionId });
    res.json("Done");
  } catch (error) {
    res.json(`Error while creating new category ${error}`);
  }
});

module.exports = router;

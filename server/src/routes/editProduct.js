const router = require("express").Router();
const { Item } = require("../../db/models");

router.put("/", async (req, res) => {
  const { name, price, id } = req.body;

  try {
    const product = await Item.findOne({ where: { name } });
    if (product && product.id !== id) {
      res.json("Product with this name already exists");
    } else {
      await Item.update({ name, price }, { where: { id } });
      res.json("Done");
    }
  } catch (error) {
    res.json(`Error while editing product ${error}`);
  }
});

module.exports = router;

const express = require("express");
const Item = require("../models/Item");
const fs = require("fs");
const router = express.Router();
const cors = require("cors");
router.use(cors());

router.post("/createitem", async (req, res) => {
  const { itemName, itemPrice, imagePath, itemDescription } = req.body;

  try {
    let item = new Item();
    item.imagePath = imagePath;
    item.itemName = itemName;
    item.itemPrice = itemPrice;
    item.itemDescription = itemDescription;

    await item.save();
    res.send({
      successMessage: `${itemName} is created successfully...`,
      item,
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/getitems", async (req, res) => {
  try {
    const items = await Item.find({});
    res.json({ items });
  } catch (error) {
    console.log(error.errorMessage);
  }
});

router.get("/:itemId", async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const item = await Item.findById(itemId);
    res.json(item);
  } catch (error) {
    res.status(500).json({ errorMessage: "Please try again later..." });
  }
});

router.put("/:itemId", async (req, res) => {
  const itemId = req.params.itemId;

  const olditem = await Item.findByIdAndUpdate(itemId, req.body);

  res.json({ successMessage: "item updated Successfully" });
});
router.delete("/deleteitem/:itemId", async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const deletedItem = await Item.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json({ errorMessage: "Item not found." });
    }

    res.json({
      successMessage: `${deletedItem.itemName} is deleted successfully...`,
      id: deletedItem?._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Server error." });
  }
});

module.exports = router;

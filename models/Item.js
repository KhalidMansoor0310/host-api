const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema(
  {
    imagePath: {
      type: String,
      required: true,
    },
    itemName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60,
    },
    itemPrice: {
      type: Number,
      required: true,
    },
    itemDescription: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// export the model
module.exports = mongoose.model("items", ItemSchema);

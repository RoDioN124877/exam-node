const { Schema, model } = require("mongoose");

const d2Scheme2 = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    nick_name: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    position:{
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("stff", d2Scheme2);

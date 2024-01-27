const { Schema, model } = require("mongoose");
const D2players2 = require("./D2players2");

const d2Scheme = new Schema(
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
    pts: {
      type: Number,
      required: true,
    },
    achivment: {
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
    couch:  [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("2", d2Scheme);

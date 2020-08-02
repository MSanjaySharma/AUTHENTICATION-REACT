/* const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const exSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 32,
      unique: true,
      index: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      required: true,
    },
  },
  { timestamps: true }
);

const Example = mongoose.model("Example", exSchema);

module.exports = Example; */

const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  amount: { type: Number, required: true }
});

module.exports = model("Products", schema);

const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  userId: { type: Types.ObjectId, ref: "Users" },
});

module.exports = model("Products", schema);

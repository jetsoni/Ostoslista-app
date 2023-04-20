const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Types.ObjectId, ref: "Roles" },
  categories: [{ type: Types.ObjectId, ref: "Categories" }],
});

module.exports = model("Users", schema);

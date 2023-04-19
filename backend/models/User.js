const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Types.ObjectId, ref: 'Roles'},
    products: [{ type: Types.ObjectId, ref: 'Products'}]
});

module.exports = model('Users', schema);

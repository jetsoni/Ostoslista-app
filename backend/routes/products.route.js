const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const Product = require("../models/products");
const router = Router();
const ObjectId = require("mongodb").ObjectId;
const auth = require("../middlewares/auth.middleware");

router.post(
  "/create",
  [
    auth,
    check("name", "name is too short").isLength({ min: 2 }),
    check("amount", "given amount is not a number").isNumeric(),
  ],
  async (req, res) => {
    try {
      const { errors } = validationResult(req);
      console.log(errors);
      if (errors.length !== 0) {
        return res.status(400).json({
          errors,
          message: "wrong register data",
        });
      }
      console.log(req.body);
      const { name, amount } = req.body;

      const product = new Product({ name, amount, userId: req.user.userId });
      await product.save();

      return res.status(201).json({ message: "product was created" });
    } catch (err) {
      console.error(`Something goes wrong, ${err.message}`);
      const { message } = err;
      return res.status(500).json({ message });
    }
  }
);

router.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: new ObjectId(req.params.id) });
    console.log(req.params.id);
    return res.status(200).json({ productInfo: product });
  } catch (err) {
    console.error(`Something goes wrong, ${err.message}`);
    const { message } = err;
    return res.status(500).json({ message });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const products = await Product.find({
      userId: new ObjectId(req.user.userId),
    });
    return res.status(200).json({ items: products });
  } catch (err) {
    console.error(`Something goes wrong, ${err.message}`);
    const { message } = err;
    return res.status(500).json({ message });
  }
});

router.delete("/delete/:id");

module.exports = router;

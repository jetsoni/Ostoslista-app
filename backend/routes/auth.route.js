const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/default");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();

router.post(
  "/register",
  [
    check("email", "wrong email").isEmail(),
    check("password", "min length").isLength({ min: 2 }),
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
      const { email, password } = req.body;

      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: "user is existed" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword });
      await user.save();

      return res.status(201).json({ message: "user was created" });
    } catch (err) {
      console.error(`Something goes wrong, ${err.message}`);
      const { message } = err;
      return res.status(500).json({ message });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "wrong email").normalizeEmail().isEmail(),
    check("password", "enter password").exists(),
  ],
  async (req, res) => {
    try {
      const { errors } = validationResult(req);
      if (errors.length !== 0) {
        return res.status(400).json({
          errors: errors.array(),
          message: "wrong login data",
        });
      }
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "wrong email/password" });
      }

      const isPasswordsMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordsMatch) {
        return res.status(404).json({ message: "wrong email/password" });
      }

      const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
        expiresIn: "1d",
      });
      return res.status(200).json({ token, userId: user.id });
    } catch (err) {
      console.error(`Something goes wrong, ${err.message}`);
      const { message } = err;
      return res.status(500).json({ message });
    }
  }
);

router.post("/logout", async (req, res) => {
  try {
  } catch (err) {
    console.error(`Something goes wrong, ${err.message}`);
    const { message } = err;
    return res.status(500).json({ message });
  }
});

router.post("/forgot", async (req, res) => {
  try {
    // if user forgets password
  } catch (err) {
    console.error(`Something goes wrong, ${err.message}`);
    const { message } = err;
    return res.status(500).json({ message });
  }
});

router.post("/reset", async (req, res) => {
  try {
    // reset password
  } catch (err) {
    console.error(`Something goes wrong, ${err.message}`);
    const { message } = err;
    return res.status(500).json({ message });
  }
});

module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const config = require('./config/default');

const app = express();
app.use(express.json({ extended: true }));
app.use('/api/v1/auth', require('./routes/auth.route'));

const port = config.port || 3000;

(async () => {
    await mongoose.connect(config.mongoUri);
    app.listen(port, () => {
        console.log("Running in port", port);
    });
})();

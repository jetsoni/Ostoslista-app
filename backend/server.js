const express = require("express");

(async () => {
    const app = express();
    app.use(express.json());

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log("Running in port", port);
    });
})();

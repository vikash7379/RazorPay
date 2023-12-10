const express = require("express");
const cors = require('cors');
const { config } = require("dotenv");
config({ path: "./config/config.env" });
const paymentRoutes = require('./routes/pay.routes');



// middleware
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api",paymentRoutes)




// server
app.listen(process.env.PORT, () => {
  console.log("server running at ", process.env.PORT);
});

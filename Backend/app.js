const express = require("express");
const app = express();
const cors = require("cors")
const mongoose = require("./conn/conn")
const userRouter = require("./routes/user")
const bookRouter = require("./routes/book")
const favouriteRouter = require("./routes/favourites")
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");
require("dotenv").config()

app.use(cors());
app.use(express.json());
//Routes
app.use("/api/v1", userRouter);
app.use("/api/v1", bookRouter);
app.use("/api/v1", favouriteRouter);
app.use("/api/v1", cartRouter);
app.use("/api/v1", orderRouter);

app.listen(process.env.PORT,()=>{
    console.log("server started") 
});
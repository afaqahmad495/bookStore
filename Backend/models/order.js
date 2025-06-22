const mongoose = require("mongoose");

const order = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"user"
    },
    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"books"
    },
    status:{
        type:String,
        default:"placed order",
        enum:["placed order", "out for dilvery, Dilvered, cancelled"]
    },
},
{timestamps: true}
);
module.exports = mongoose.model("order", order)
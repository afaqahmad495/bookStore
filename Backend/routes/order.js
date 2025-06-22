const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const Order = require("../models/order");
const {authenticateToken}  = require("./userAuth");

//place order
router.post("/place-order", authenticateToken, async (req, res)=>{
    try{
        const {id} = req.headers;
        const {order} = req.body;

        for(const orderData of order){
            const newOrder = new Order({user: id,book: orderData._id});
            const orderDataFromDB = await newOrder.save();

            //saving order in user model
            await User.findByIdAndUpdate(id, {$push:{orders: orderDataFromDB._id}})

            //clearning cart
            await User.findByIdAndUpdate(id, {$pull:{cart: orderData._id}})
        }
            return res.json({
                status:"Success",
                message: "order placed successfully"
            })
        
    }catch(error){
        console.log(error)
        res.status(500).json({message: "An error occurred"})
    }
});

// get order history of particular user 
router.get("/get-order-history", authenticateToken, async (req, res)=>{
    try{
        const {id} = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: {path: "book"},
        });
        if (!userData || !userData.orders) {
            return res.status(404).json({ status: "Fail", message: "No orders found" });
          }
        const orderData = userData.orders.reverse(); 
        
            return res.json({
                status:"Success",
                data: orderData
            })
        
    }catch(error){
        console.log(error)
        res.status(500).json({message: "An error occurred"})
    }
});

// get all orders ---admin 
router.get("/get-all-orders", authenticateToken, async (req, res)=>{
    try{
        
        const userData = await Order.find()
        .populate({
            path: "book",
            })
        .populate({
            path: "user"
        })
        .sort({createdAt: -1});    
        
            return res.json({
                status:"Success",
                data: userData
            })
        
    }catch(error){
        console.log(error)
        res.status(500).json({message: "An error occurred"})
    }
});

//update order status -----admin
router.put("/update-status/:OrderId", authenticateToken, async (req, res)=>{
   try{

    const {OrderId} = req.params;
    const {id} = req.headers;
    // console.log("Update request for Order ID:", OrderId);
    // console.log("New status:", req.body.status);
    // console.log("User ID:", id);
    const user = await User.findById(id)
    if(user.roll === "admin"){
    await Order.findByIdAndUpdate(OrderId, {status:req.body.status})
    return res.json({
        status: "success",
        message: "status update successfully"
    });
}
    
   }catch(error){
    res.status(500).json({message: "An error Occurred"})
   }
})
module.exports = router;
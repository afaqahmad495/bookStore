const router = require("express").Router();
const User = require("../models/user");
const {authenticateToken}  = require("./userAuth");

router.put("/add-to-cart", authenticateToken, async (req, res)=>{
    try{
        const {bookid, id} = req.headers;
    const userData = await User.findById(id);
    const isBookCart = userData.cart.includes(bookid);
    if(isBookCart){
        return res.json({
            status: "success",
            message:"book is already add to cart"
        })
    } 
    await User.findByIdAndUpdate(id, {$push: {cart:bookid}});
    return res.json({
        status: "success",
        message:"book added to cart"
    }); 
    }catch(error){
        console.log(error)
        res.status(500).json({message: "An Error occurred"})
    }
});

//delete to cart
router.delete("/remove-cart/:bookid",authenticateToken, async (req, res)=>{
   try{
        const {bookid} = req.params
        const {id} = req.headers
        const userData =  await User.findById(id);
        const isBookCart = userData.cart.includes(bookid);
        if(isBookCart){
            await User.findByIdAndUpdate(id, {$pull: {cart: bookid}})
        } 
        return res.json({status: "success", message:"book removes form cart"})

   }catch(error){
       res.status(500).json({messsage: "An error occurred"})
   }
});

//get cart of a particular user
router.get("/get-user-cart",authenticateToken, async (req, res)=>{
   try{
        
        const {id} = req.headers
        const userData =  await User.findById(id).populate("cart");
        const cart = userData.cart.reverse();
         
        return res
        .json({
            status: "success",
            message:cart
        })

   }catch(error){
       res.status(500).json({messsage: "An error occurred"})
   }
});



module.exports = router;
const router = require("express").Router();
const User = require("../models/user");
const {authenticateToken}  = require("./userAuth");

//add book to favourites
router.put("/add-book-favourite",authenticateToken, async (req, res)=>{
   try{
        const {bookid, id} = req.headers
        const userData =  await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if(isBookFavourite){
           return res.status(200).json({message:"book is already in favourites"})
        } 
        await User.findByIdAndUpdate(id, {$push: {favourites: bookid}})
        return res.status(200).json({message:"book added to favourites"})

   }catch(error){
       res.status(500).json({messsage: "An error occurred"})
   }
});

//delete to favourite 
router.delete("/remove-book-favourite",authenticateToken, async (req, res)=>{
   try{
        const {bookid, id} = req.headers
        const userData =  await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if(isBookFavourite){
            await User.findByIdAndUpdate(id, {$pull: {favourites: bookid}})
        } 
        return res.status(200).json({message:"book removes form favourites"})

   }catch(error){
       res.status(500).json({messsage: "An error occurred"})
   }
});

//get favourite books of a particular user
router.get("/get-favourite-book",authenticateToken, async (req, res)=>{
    try{
        const {id} = req.headers;
    const userData = await User.findById(id).populate("favourites")
    const favouriteBooks = userData.favourites
    return res.json({
        status: "success",
        Data: favouriteBooks
    })
    }catch(error){
        res.status(500).json({message: "An error occured"});
    }
});

//

module.exports = router;
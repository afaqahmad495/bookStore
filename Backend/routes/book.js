const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Book = require("../models/book")
const {authenticateToken}  = require("./userAuth")

//add book
router.post("/add-book",authenticateToken, async (req, res)=>{
    try{
        const {id} = req.headers;
        const user = await User.findById(id)
        if(user.roll !== "admin"){
            
            return res.status(400).json({message:"you are not having access to perfome admin work"})
        }
          const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language
          });
          await book.save();
          res.status(200).json({message: "book added successfully"})

    }catch(error){
        res.status(500).json({message: "internal server error"});
    }
});

//update book 
router.put("/update-book",authenticateToken, async (req, res)=>{
    try{
        const {bookid} = req.headers;
        console.log(bookid)
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language
        });
        return res.status(200).json({message: "book updated successfully"})

    }catch(error){
        res.status(500).json({message: "An error occurred"})
    }
});

//delete book
router.delete("/delete-book",authenticateToken, async (req, res)=>{
    try{
        const {bookid} = req.headers;
    await Book.findByIdAndDelete(bookid);
    return res.status(200).json({message: "book deleted successfully"}); 
    }catch(error){
        res.status(500).json({message: "An error occurred"})

    }
});
//get book information
router.get("/get-book-information",async (req, res)=>{
   try{
    const books = await Book.find().sort({createdAt: -1});
    return res.json({
        status:"success",
        data: books
    })
   }catch(error){
    res.status(500).json({message: "An error occurred"})

   }
});
//get all books recently added limit 4
router.get("/get-recent-book",async (req, res)=>{
    try{
     const books = await Book.find().sort({createdAt: -1}).limit(4);
     return res.json({
         status:"success",
         data: books
     })
    }catch(error){
     res.status(500).json({message: "An error occurred"})
 
    }
 });
 //get book information by id
router.get("/get-book-by-id/:id",async (req, res)=>{
    try{
        const {id} = req.params;
     const books = await Book.findById(id);
     return res.json({  
         status:"success",
         data: books
     })
    }catch(error){
     res.status(500).json({message: "An error occurred"})
 
    }
 });

module.exports = router;
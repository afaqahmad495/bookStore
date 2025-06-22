const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {authenticateToken}  = require("./userAuth")

//Sign up
router.post("/sign-up" ,async (req, res)=>{
    try{
        const {username, email, password, address} = req.body

        //check username length is more than or equal to 4
        if(username.length < 4){
            return res
            .status(400)
            .json({message: "username length should be grater than or equal to 4"})
        }
        //check username already exsists
        const exsistingUsername = await User.findOne({username: username});
        if(exsistingUsername){
            return res
            .status(400)
            .json({message: "username already exists"})
        }
        //check email already exists
        const exsistingEmail =await User.findOne({email: email})
        if(exsistingEmail){
            return res
            .status(400)
            .json({message: "email already exsist"})
        };
        //check password length
        if(password.length < 5){
            return res
            .status(400)
            .json({message: "password length should be grater than 4 "})
        } 
        let hashpass =await bcrypt.hash(password, 10)
        const newUser = new User({
            username: username,
            email: email,
            password: hashpass,
            address: address
        }); 
        await newUser.save();
        return res.status(200).json({message: "sign-up successfully"})
    }catch (error){
       res.status(500).json({message: "internal server error"})
    }
});

//sign-in
router.post("/sign-in",async (req, res)=>{
    try{
        const {username, password} = req.body
        const exisitingUser = await User.findOne({username: username});

        if(!exisitingUser){
            res.status(400).json({message: "Invalid user"})
        }
            bcrypt.compare(password, exisitingUser.password, (err, data)=>{
            if(data){
                const authClaims = [{name: exisitingUser.username},{roll:exisitingUser.roll}]
            const token = jwt.sign({authClaims}, "bookstore1")    
                res.status(200).json({id: exisitingUser._id, roll: exisitingUser.roll,token: token })

            }else{
                res.status(500).json({message: "Invalid user"})

            }
            });
        }catch (error){
         res.status(500).json({message: "internal server error"})
    }
});

//get user information
router.get("/get-user-information",authenticateToken, async (req, res)=>{
    try{
       const {id} = req.headers;
       const data = await User.findById(id).select("-password");
       return res.status(200).json(data);
    }catch (error){
        res.status(500).json({message: "internal server error"})
    }
});

//update address
router.put("/update-address",authenticateToken,async (req, res)=>{
try{
    
        const {id} = req.headers;
        const {address} = req.body
        await User.findByIdAndUpdate(id, {address: address})
        return res.status(200).json({message: "address change Successfully"})
    
} catch (error){
     res.status(500).json({message: "internal server error "})
}
})

module.exports = router;
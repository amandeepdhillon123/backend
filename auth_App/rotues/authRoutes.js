const express = require("express");

const router =express.Router();
const User= require("../model/authModel")

const { signUp, login } = require("../controllers/authController");

const{auth, isStudent, isAdmin}= require("../middleware/auth")


router.post("/signup",signUp)
router.post("/login",login)

router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:'Welcome to the Protected route for TESTS',
    });
})

router.get("/student", auth, isStudent, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for Students',
    });
} );

router.get("/admin", auth, isAdmin, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for Admin',
    });
});

router.get('/getEmail',auth,async(req,res)=>{
    try {
         const id= req.user.id;
        
         const user = await User.findById(id)
         console.log("hello",user);

         res.status(200).json({
                        success:true,
                        user:user,
                        message:'Welcome to the email route',
                    })
                }
                catch(error) {
                    res.status(500).json({
                        success:false,
                        error:error.message,
                        message:'Fatt gya code',
                    })
    
        
    }
})



router
module.exports = router;
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    //  get token

    const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
    // console.log(token)

    if (!token || token === undefined) {
      return res.status(400).json({
        success: false,
        message: "Token missing",
      });
    }
    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        console.log(payload)

        req.user= payload;
    } catch (error) {
        
        return res.status(401).json({
            success:false,
            message:'token is invalid',
            error:error.message
        });
    }
   
  } catch (error) {
    return res.status(401).json({
        success:false,
        message:'token is invalid',
    });
  }
  next();
};

exports.isStudent=async(req,res,next)=>{
    try {
         if(req.user.role !=="Student"){
            return res.statis(400).json({
                success:false,
                message:"this is for protected routes for students"
            })
         }
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:'token is invalid',
        });
    }
    next();
}

exports.isAdmin=async(req,res,next)=>{
    try {
         if(req.user.role !=="Admin"){
            return res.statis(400).json({
                success:false,
                message:"this is for protected routes for admin"
            })
         }
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:'token is invalid',
        });
    }
    next();
}

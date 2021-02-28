const dotenv = require("dotenv");
dotenv.config();
const jwt=require("jsonwebtoken");

const checkJWT=(req,res,next)=>{    
    const jwtSecretKey = `${process.env.JWT_SECRET_KEY}`;    
    try{       
        const bearerToken=req.headers.authorization.split(" ")[1];//Bearer assad                
        var decodedToken=jwt.verify(bearerToken,jwtSecretKey);        
        req.user=decodedToken;
        next();
    }catch(err){
        res.status(400).json({
            message:"Invalid JWT Token"
        })
    };
    
} 

module.exports=checkJWT;

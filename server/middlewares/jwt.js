const jwt=require("jsonwebtoken");

const checkJWT=(req,res,next)=>{
    try{        
        const bearerToken=req.headers.authorization.split(" ")[1];//Bearer assad
        var decodedToken=jwt.verify(bearerToken,"secretKey");
        req.user=decodedToken;
        next();
    }catch(err){
        res.status(400).json({
            message:"Invalid JWT Token"
        })
    };
    
} 

module.exports=checkJWT;

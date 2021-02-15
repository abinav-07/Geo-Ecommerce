const {User}=require("../models/index");
const bcrypt=require("bcrypt");

const getUserByEmail=async (email)=>{
    const user=await User.findOne({
        raw:true,
        where:{
            email:email
        },
        attributes:['user_id',`first_name`, `last_name`, `email`, `password`, `google_id`, `application_rating`, `createdAt`, `updatedAt`]
    });    
    return user;
}

const registerUser=async (userObj)=>{
    //console.log(User.users.fi);
    const hashPassword=bcrypt.hashSync(userObj.password,2);    

    const user=await User.create({
        first_name:userObj.firstName,
        last_name:userObj.lastName,
        email:userObj.email,
        password:hashPassword        
    });
 
    return user;
}

const registerGoogleUser=async (userObj)=>{
    //console.log(User.users.fi);
    // const hashPassword=bcrypt.hashSync(userObj.password,2);    

    const user=await User.create({
        first_name:userObj.firstName,        
        email:userObj.email,
        google_id:userObj.googleId
    });
 
    return user;
}

module.exports={
    getUserByEmail,
    registerUser,
    registerGoogleUser
}
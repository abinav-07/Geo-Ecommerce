const MessageQueries=require("../../queries/message");

const getRoomMessages=async(req,res)=>{
    try{
        if(req.query.room){
            const getMessages=await MessageQueries.getRoomMessages(req.query.room);
            res.status(200).send(getMessages);
        }else{
            res.status(400).json({message:"Missing Query Params"});
        }

    }catch(err){
        console.log(err);
    }
}

module.exports={
    getRoomMessages
}
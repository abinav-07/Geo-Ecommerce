const { MessageRooms, PrivateMessages } = require("../models/index");

const { Op } = require("sequelize");

const findRoomOne=async(room)=>{
    return  await MessageRooms.findOne({
        where: {
            socket_room: room
        }
    })
};

const addSocketRoom = async (user_id, seller_id, product_id, room) => {
    const findRoom = await findRoomOne(room);
    if (findRoom === null) {
        const createRoom = await MessageRooms.create({
            user_id: user_id,
            seller_id: seller_id,
            product_id: product_id,
            socket_room: room
        });
        return "Room Created";
    }
    console.log("Message Room Already Exists")
    return "Message Room Already Exists";
};

const addMessage = async (user_id, message, room) => {
    
    const findRoom = await findRoomOne(room);
    if(findRoom!=null){
        const createMessage=await PrivateMessages.create({
            user_id:user_id,
            message:message,
            room_id:findRoom.id
        });
        return "Message Added"
    }
    return "Message Not Added"
};

const getRoomMessages=async(room)=>{
    const getAllRoomMessages=  await MessageRooms.findAll({
        attributes:["user_id","seller_id","product_id","socket_room"],        
        include:[{
            model:PrivateMessages,
            as:"messages",
            attributes:["user_id",["message","text"]]
        }] ,
        where: {
            socket_room: room
        },
        
    });
    
    return getAllRoomMessages;
}

module.exports = {
    addSocketRoom,
    addMessage,
    getRoomMessages
}
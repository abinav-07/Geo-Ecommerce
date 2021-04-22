//Require Modules
const express = require("express");
const dotenv = require("dotenv");
var cors = require('cors');
const bodyParser = require("body-parser");
dotenv.config();

const http = require("http");
const socketio = require("socket.io");

const MessageQueries=require("./queries/message");

//Require Files


//Initialize with express
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "*")
    next();
});

//Routing
app.use("/", require("./routes/index"));

//Socket methods
const server = http.Server(app);
const io = socketio(server, {
    cors: {
        origin: process.env.CLIENT_API,
        methods: ["GET", "POST"]
    }
});

let socketUsers = {};

io.on('connection', (socket) => {
    let userId;
    socket.on('join', ({ current_user_id, user_id, seller_id, product_id }, callback) => {
        
        userId = current_user_id;

        /*
        Checking User,
        if user doesnot exists, create new user array,
        append socket id to user array.
        */
        if (!socketUsers[current_user_id]) socketUsers[current_user_id] = [];

        socketUsers[current_user_id].push(socket.id);

        //Broadcast user is online.
        io.sockets.emit('online', socketUsers);

        socket.join(`${user_id}-${seller_id}-${product_id}`);

        MessageQueries.addSocketRoom(user_id,seller_id,product_id,`${user_id}-${seller_id}-${product_id}`)

        if (!user_id) { callback({ error: "error" }) };
    });



    socket.on('privateMsg', ({ room, currentUserId: user_id, sellerId: seller_id, productId: product_id, message }, callback) => {        
        socket.broadcast.to(room)
            .emit('message', { user_id: user_id, text: message });
        MessageQueries.addMessage(user_id,message,room);

        callback();
    })
    console.log('a user connected');
    socket.on('disconnect', () => {
        //Remove Socket User        
        delete socketUsers[userId];
        //Broadcast user is offline.
        io.sockets.emit('offline', socketUsers);
        console.log('user disconnected');
    });
});


server.listen(process.env.PORT || 5000, () => {
    console.log("Listening");
})




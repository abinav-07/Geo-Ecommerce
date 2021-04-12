const MessageQueries = require("../../queries/message");
const nodemailer = require("nodemailer");

let nodemaielrTransporter = nodemailer.createTransport({
    // host: "smtp.gmail.com",
    //samanorganiz

    service: 'gmail',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "abighimire07@gmail.com",
        pass: "",
    },
})

const getRoomMessages = async (req, res) => {
    try {
        if (req.query.room) {
            const getMessages = await MessageQueries.getRoomMessages(req.query.room);
            res.status(200).send(getMessages);
        } else {
            res.status(400).json({ message: "Missing Query Params" });
        }

    } catch (err) {
        console.log(err);
    }
}

const sendMessageEmail = async (req, res) => {
    if (req.body) {
        console.log(req.body);
        let mailOptions = {
            from: req.body.senderEmail,
            to: req.body.receiverEmail,
            subject: "New Message",
            text: req.body.message
        };

        nodemaielrTransporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            } else {
                console.log(info)
                res.status(200).send("Message Email Sent");
            }
        })
    } else {
        res.status(400).json({ message: "Missing Body" });
    }
}

module.exports = {
    getRoomMessages,
    sendMessageEmail
}
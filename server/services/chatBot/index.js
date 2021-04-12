const MyModel = require("./naiveclassifiers/my_model");
const Chat = require('./naiveclassifiers/reply');
const fs = require("fs");

const trainModel = (req, res) => {
    let modelResult = MyModel.trainModel();
    res.send(modelResult);
}

const chatReply = (req, res) => {
    let userMessage = req.body.userMessage;
    Chat.getAction(userMessage).then(trainedAction => {
        if (trainedAction == "gibberish") {
            trainedAction = trainedAction
        } else {
            trainedAction = trainedAction.substring(1, trainedAction.length - 1);
        }

        var botReplyMessage = JSON.parse(fs.readFileSync('reply.json', 'utf8'));
        botReplyMessage.forEach((element) => {
            if (trainedAction == element.action) {
                var response = {};
                response.reply = element.reply;
                res.status(200).send(response);
                return false;
            }
        });
    }, err => {
        res.status(400).send(err);
    })

}

module.exports = {
    trainModel,
    chatReply
}
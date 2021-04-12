var model = require("./classifier");

function getAction(sentence) {
    return new Promise((resolve, reject) => {
        model.loadClassifier('./model.json').then(classifier => {
            model.train(classifier).then(response => {
                let detectedLabel = model.predict(classifier, sentence);
                return resolve(detectedLabel);
            }).catch(err => {
                return reject("Could Not Load the Model");
            });
        });
    });
};

module.exports = {
    getAction: getAction
}
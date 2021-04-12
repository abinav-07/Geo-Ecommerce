var natural = require("natural");

function getNewClassifier() {
    return new natural.BayesClassifier();
};

function loadClassifier(sourceFile) {
    return new Promise(function (resolve, reject) {
        natural.BayesClassifier.load(sourceFile, null, (err, loadedClassifier) => {
            if (loadedClassifier) {
                return resolve(loadedClassifier);
            } else {
                reject(err);
            }
        });
    })
}

function addTraining(classifier, utterance, label) {
    classifier.addDocument(utterance, label);
}

function train(classifier) {
    return new Promise(function (resolve) {
        classifier.train();
        return resolve();
    })
}

function predict(classifier, utterance) {
    // console.log(classifier.getClassifications(utterance)[0]["value"])
    if (classifier.getClassifications(utterance)[0]["value"] >= 0.75)
        return "gibberish";
    return JSON.stringify(classifier.classify(utterance));
}

module.exports = {
    loadClassifier: loadClassifier,
    addTraining: addTraining,
    predict: predict,
    train: train,
    getNewClassifier: getNewClassifier
}

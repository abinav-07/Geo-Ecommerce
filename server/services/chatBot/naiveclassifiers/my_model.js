var model = require("./classifier");

function trainModel() {
    var classifier = model.getNewClassifier();

    //Adding Training Data
    model.addTraining(classifier,"who are you","tellme");
    model.addTraining(classifier,"who are you","tellme");
    model.addTraining(classifier,"tell me about yourself","tellme");
    model.addTraining(classifier,['are', 'you'], 'tellme');
    model.addTraining(classifier,['about', 'you'], 'tellme');
    model.addTraining(classifier,['hi', 'hello','sup','howdy','yo','what are you?'], 'tellme');
    model.addTraining(classifier,'what are you?', 'tellme');
    model.addTraining(classifier,'what are you', 'tellme');
    

    model.addTraining(classifier,"what have you got?","showtopcategories");
    model.addTraining(classifier,"products?","showtopcategories");
    model.addTraining(classifier,"products","showtopcategories");
    model.addTraining(classifier,"show top categories","showtopcategories");
    model.addTraining(classifier,"show me around please","showtopcategories");
    model.addTraining(classifier,"what's in store?","showtopcategories");
    model.addTraining(classifier,"what do you have?","showtopcategories");
    model.addTraining(classifier,"alright. tell me what you have?","showtopcategories");
    model.addTraining(classifier,"what do you have","showtopcategories");    
    model.addTraining(classifier,"alright. so what do you have?","showtopcategories");
    model.addTraining(classifier,"what do you sell again?","showtopcategories");
    model.addTraining(classifier,"so what do you sell again?","showtopcategories");
    model.addTraining(classifier,"what other products do you have?","showtopcategories");
    model.addTraining(classifier,"what do you have/","showtopcategories");
    model.addTraining(classifier,"show me what you got","showtopcategories");
    model.addTraining(classifier,"help me","showtopcategories");

    saveMyClassifier(classifier, "./model.json");
    return "model created";
}

function saveMyClassifier(myClassifier, destinationFile) {
    return new Promise((resolve, reject) => {
        myClassifier.save(destinationFile, null, (err, savedMyClassifier) => {
            if (savedMyClassifier) {
                return resolve(savedMyClassifier);
            } else {
                reject(err);
            }
        });
    });
}

module.exports = {
    trainModel: trainModel
}
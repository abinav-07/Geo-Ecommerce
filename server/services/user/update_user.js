const Users = require("../../queries/user");

const updateApplicationRating = (req, res) => {
    try {
        if (!req.body.user_id || !req.body.application_rating) {
            res.status(400).json({ message: "Missing bodies!" });
        } else {
            const response = Users.updateApplicationRating({
                user_id: req.body.user_id,
                application_rating: req.body.application_rating
            })
            res.status(200).send("Thank you!");
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    updateApplicationRating
}
const Users = require("../../queries/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");

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

const updateUserProfile = async (req, res) => {
    const schema = Joi.object({
        user_id: Joi.number().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required().email(),
    });
    const validateResponse = schema.validate(req.body, { abortEarly: false });
    if (validateResponse && validateResponse.error) res.status(400).send(validateResponse.error);
    if (!validateResponse.error) {
        const updateUserProfileResponse = await Users.updateUserProfile(req.body);
        if (updateUserProfileResponse) {
            res.status(200).send("Profile Updated");
        }
    }
}

const updateUserPassword = async (req, res) => {
    const schema = Joi.object({
        user_id: Joi.number().required(),
        oldPassword: Joi.string().required(),
        newPassword: Joi.string().required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,20})')).messages({
            'string.pattern.base': "New Password must contain alphabets and numbers",
            'string.required': 'New Password is required'
        }),
    });
    const validateResponse = schema.validate(req.body, { abortEarly: false });
    if (validateResponse && validateResponse.error) res.status(400).send(validateResponse.error);
    if (!validateResponse.error) {

        if (req.body.oldPassword === req.body.newPassword) {
            res.status(401).json({ message: "Same passwords not allowed!" });
        } else {

            const userResponse = await Users.getUserByEmail(req.user.user.email);
            if (userResponse) {
                //Checking for password, if from google, no password required
                if (userResponse.password) {
                    if (userResponse && (userResponse.password && !bcrypt.compareSync(req.body.oldPassword, userResponse.password))) res.status(401).json({ message: "Password did not match!" });
                    if (userResponse && bcrypt.compareSync(req.body.oldPassword, userResponse.password)) {

                        const updateUserPasswordResponse = Users.updateUserPassword(req.body);
                        if (updateUserPasswordResponse) {
                            res.status(200).send("Password Updated");
                        }
                    }
                } else {

                    const updateUserPasswordResponse = Users.updateUserPassword(req.body);

                    if (updateUserPasswordResponse) {
                        res.status(200).send("Password Updated");
                    }
                }
            } else {
                res.status(401).json({ message: "Email not registered" });
            }
        }
    }
}

module.exports = {
    updateApplicationRating,
    updateUserProfile,
    updateUserPassword
}
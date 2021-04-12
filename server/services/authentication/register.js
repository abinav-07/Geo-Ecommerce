const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const Users = require("../../queries/user");

const registerUser = async (req, res) => {

    const jwtSecretKey = `${process.env.JWT_SECRET_KEY}`;
    let schema;
    let validationResult;
    //Google Auth or Normal 
    const type = req.body.type;

    if (type) {

        //Validations    
        schema = Joi.object({
            firstName: Joi.string(),
            email: Joi.string().required().email(),
            type: Joi.string().required(),
            googleId: Joi.string().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
        });
        validationResult = schema.validate(req.body, { abortEarly: false });
        if (validationResult && validationResult.error) {
            res.status(401).send(validationResult);
        } else {
            const user = {
                firstName: req.body.firstName,
                email: req.body.email,
            }

            const response = await Users.getUserByEmail(user.email) || {};
            if (response.email) {
                res.status(400).json({ message: "User Already Registered" });
            } else {

                const registerResponse = await Users.registerGoogleUser(req.body);

                const payload = {
                    user_id: registerResponse.user_id,
                    first_name: registerResponse.first_name,
                    last_name: registerResponse.last_name,
                    email: registerResponse.email,
                    google_id: registerResponse.google_id,
                    total_expenditure: registerResponse.total_expenditure,
                    application_rating: registerResponse.application_rating,
                    address: registerResponse.address
                }

                var token = jwt.sign({ user: payload }, jwtSecretKey);
                res.send({
                    user: payload,
                    token
                });
            }
        }
    } else {

        //Validations    
        schema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().required().email(),
            password: Joi.string().required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,20})')).messages({
                'string.pattern.base': "Password must contain alphabets and numbers",
                'string.required': 'Password is required'
            }),
            confirm_password: Joi.string().equal(Joi.ref("password")).required().messages({
                'any.only': "Passwords do not match",
                'string.required': 'Confirm Password is required'
            }),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
        });

        validationResult = schema.validate(req.body, { abortEarly: false });

        if (validationResult && validationResult.error) {
            res.status(401).send(validationResult);
        } else {
            const user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            }

            const response = await Users.getUserByEmail(user.email) || {};
            if (response.email) {
                res.status(400).json({ message: "User Already Registered" });
            } else {
                const registerResponse = await Users.registerUser(req.body);

                const payload = {
                    user_id: registerResponse.user_id,
                    first_name: registerResponse.first_name,
                    last_name: registerResponse.last_name,
                    email: registerResponse.email,
                    google_id: registerResponse.google_id,
                    total_expenditure: registerResponse.total_expenditure,
                    application_rating: registerResponse.application_rating,
                    address: registerResponse.address
                }
                var token = jwt.sign({ user: payload }, jwtSecretKey);
                res.send({
                    user: payload,
                    token
                });
            }
        }
    }


}

module.exports = {
    registerUser
}
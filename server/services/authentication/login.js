const dotenv = require("dotenv");
dotenv.config();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../../queries/user");

const loginUser = async (req, res) => {
    const jwtSecretKey = `${process.env.JWT_SECRET_KEY}`;
    let schema;
    let type = req.body.type;

    if (type) {
        //validations
        schema = Joi.object({
            firstName:Joi.string(),
            email: Joi.string().required(),
            googleId:Joi.string().required(),
            type:Joi.string().required()            
        });
        try {
            const validateResponse = schema.validate(req.body, { abortEarly: false });

            if (validateResponse && validateResponse.error) {
                res.status(401).send(validateResponse);
            } else {
                const userResponse = await Users.getUserByEmail(req.body.email);

                if (!userResponse || !userResponse.email) res.status(401).send("Email not registered");

                if (userResponse && (userResponse.google_id && userResponse.google_id!=req.body.googleId)) res.status(401).send("Google Id Error");

                if (userResponse && userResponse.email) {
                    const payload = {
                        user_id: userResponse.user_id,
                        first_name: userResponse.first_name,
                        last_name: userResponse.last_name,
                        email: userResponse.email,
                        google_id: userResponse.google_id,
                        application_rating: userResponse.application_rating
                    }

                    var token = jwt.sign({ user: payload }, jwtSecretKey);

                    res.status(200).send({
                        user: payload,
                        token
                    })
                }
            }


        } catch (err) {
            console.log(err);
        }
    } else {

        //validations
        schema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required()
        });

        try {
            const validateResponse = schema.validate(req.body, { abortEarly: false });

            if (validateResponse && validateResponse.error) {
                res.status(401).send(validateResponse);
            } else {
                const userResponse = await Users.getUserByEmail(req.body.email);

                if (!userResponse || !userResponse.email) res.status(401).send("Email not registered");

                if (userResponse && (userResponse.password && !bcrypt.compareSync(req.body.password, userResponse.password))) res.status(401).send("Incorrect Password");

                if (userResponse && bcrypt.compareSync(req.body.password, userResponse.password)) {
                    const payload = {
                        user_id: userResponse.user_id,
                        first_name: userResponse.first_name,
                        last_name: userResponse.last_name,
                        email: userResponse.email,
                        google_id: userResponse.google_id,
                        application_rating: userResponse.application_rating
                    }

                    var token = jwt.sign({ user: payload }, jwtSecretKey);

                    res.status(200).send({
                        user: payload,
                        token
                    })
                }
            }


        } catch (err) {
            console.log(err);
        }
    }

}

module.exports = {
    loginUser
}
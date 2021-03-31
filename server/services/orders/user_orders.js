
const Joi = require("joi");
const Users = require("../../queries/user");

const registerOrder = async (req, res) => {
    let schema;
    let validationResult;

    //Cash in hand or online type
    const paymentMethod = req.body.payment_method;
    if (paymentMethod) {
        schema = Joi.object({
            payment_method: Joi.string().valid("cash_in_hand", "online_payment").required(),
            user_id: Joi.number().required(),
            seller_id: Joi.number().required(),
            product_id: Joi.number().required(),
            current_user_address: Joi.object().required(),
            seller_address: Joi.object().required(),
            delivered: Joi.boolean().required(),
            paid: Joi.boolean().required(),
            time_for_delivery: Joi.string(),
            product_quantity: Joi.number().min(1).max(10).required()
        });

        validationResult = schema.validate(req.body, { abortEarly: false });
        if (validationResult && validationResult.error) {
            res.status(400).send(validationResult.error);
        } else {
            const response = await Users.registerOrder(req.body);
            if (response) {
                res.status(200).send(response);
            }
        }

    } else {
        res.status(400).json({ message: "Missing Body" });
    }

};

module.exports = {
    registerOrder
}
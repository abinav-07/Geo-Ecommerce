const Users = require("../../queries/user");
const Products = require("../../queries/products");

const getUserAddress = async (req, res) => {
    if (req.query.user_id) {
        const response = await Users.getUserAddress(req.query.user_id);
        res.status(200).send(response);
    } else {
        res.status(400).json({ message: "Missing Query" });
    }
}

const getUserDetail = async (req, res) => {

    const { user_id } = req.user.user;

    if (user_id) {

        const response = await Users.getUserAllDetails(user_id);

        const payload = {
            user_id: response.user_id,
            first_name: response.first_name,
            last_name: response.last_name,
            email: response.email,
            google_id: response.google_id,
            total_expenditure: response.total_expenditure,
            application_rating: response.application_rating,
            order_details: response.order_details,
            address: response.address,
            message_rooms: response.message_rooms
        }
        res.status(200).send(payload);
    } else {
        res.status(400).send({ message: "Authentication Error" })
    }

};

const getUserEmail = async (req, res) => {
    const { user_id } = req.query;

    if (user_id) {
        const response = await Users.getUserEmail(user_id);
        res.status(200).send(response);
    } else {
        res.status(400).send({ message: "Authentication Error" })
    }
};

const addReviews = async (req, res) => {    
    const { review, user_id, product_id } = req.body;
    if (review && user_id && product_id) {
        const response = await Products.addProductReviews(req.body);
        res.status(200).send("Review Added!");
    } else {
        res.status(400).json({ message: "Body Params Missing!" })
    }
}

module.exports = {
    getUserDetail,
    getUserAddress,
    getUserEmail,
    addReviews
}
const Users = require("../../queries/user");

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

    const response = await Users.getUserAllDetails(user_id);

    const payload = {
        user_id: response.user_id,
        first_name: response.first_name,
        last_name: response.last_name,
        email: response.email,
        google_id: response.google_id,
        application_rating: response.application_rating,
        order_details: response.order_details,
        address: response.address,
        message_rooms: response.message_rooms
    }
    res.status(200).send(payload);
};

module.exports = {
    getUserDetail,
    getUserAddress
}
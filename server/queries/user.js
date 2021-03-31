const { User, Address, Products, OrderDetails, PrivateMessages, MessageRooms, sequelize } = require("../models/index");
const bcrypt = require("bcrypt");

const { Op } = require("sequelize");

const getUserAllDetails = async (user_id) => {
    const response = await sequelize.transaction(async (t) => {
        const user = await User.findOne({
            where: {
                user_id: user_id
            },
            attributes: ['user_id', `first_name`, `last_name`, `email`, `google_id`, `address_id`, `application_rating`, `createdAt`, `updatedAt`],
            include: [
                {
                    model: OrderDetails,
                    attributes: ["id", "buyer_id", "seller_id", "product_id", "product_quantity", "delivered", "paid", "payment_method"],
                    as: "order_details",
                    include: [
                        {
                            model: Products,
                            attributes: ["product_name"],
                            include: [
                                {
                                    model: User,
                                    as: "user_detail",
                                    attributes: ["first_name", "last_name", "email"]
                                }
                            ]
                        }
                    ]
                },
            ],
        });

        if (user) {

            const address = await Address.findOne({
                raw: true,
                where: {
                    id: user["address_id"]
                }
            });

            user["address"] = address;

            const messages = await MessageRooms.findAll({
                where: {
                    [Op.or]: {
                        user_id: user_id,
                        seller_id: user_id
                    }
                },
                include: [{
                    model: PrivateMessages,
                    as: "messages",
                    required: true

                }]
            });

            user["message_rooms"] = messages;
        }

        return user;
    });

    return response;
};

const getUserByEmail = async (email) => {

    const response = await sequelize.transaction(async (t) => {
        const user = await User.findOne({
            where: {
                email: email
            },
            attributes: ['user_id', `first_name`, `last_name`, `email`, `password`, `google_id`, `address_id`, `application_rating`, `createdAt`, `updatedAt`],
            include: [
                {
                    model: OrderDetails,
                    attributes: ["id", "buyer_id", "seller_id", "product_id", "product_quantity", "delivered", "paid", "payment_method"],
                    as: "order_details",

                }
            ]
        });
        if (user) {
            const address = await Address.findOne({
                raw: true,
                where: {
                    id: user.address_id
                }
            });

            user["address"] = address;

        }

        return user;
    });

    return response;
}

const getUserAddress = async (user_id) => {

    const response = await sequelize.query(`SELECT u.user_id,u.address_id, a.latitude,a.longitude 
        FROM users u
        LEFT JOIN address a ON u.address_id=a.id
        WHERE u.user_id=${user_id}   
        LIMIT 1     
    `, {
        raw: true
    });

    return response;
};

const registerUser = async (userObj) => {
    //console.log(User.users.fi);

    const hashPassword = bcrypt.hashSync(userObj.password, 2);

    const response = await sequelize.transaction(async (t) => {
        const user = await User.create({
            first_name: userObj.firstName,
            last_name: userObj.lastName,
            email: userObj.email,
            password: hashPassword
        });

        const address = await Address.create({
            latitude: userObj.latitude,
            longitude: userObj.longitude
        });

        await User.update({ address_id: address.id }, {
            where: {
                user_id: user.user_id
            }
        });
        user["address"] = address;

        return user;
    });

    return response;

}

const registerGoogleUser = async (userObj) => {

    const response = await sequelize.transaction(async (t) => {
        const user = await User.create({
            first_name: userObj.firstName,
            email: userObj.email,
            google_id: userObj.googleId
        });
        const address = await Address.create({
            latitude: userObj.latitude,
            longitude: userObj.longitude
        });

        await User.update({ address_id: address.id }, {
            where: {
                user_id: user.user_id
            }
        });
        user["address"] = address;
        return user;
    })

    return response;
}

const updateApplicationRating = async (values) => {

    const response = await User.update({ application_rating: values.application_rating }, {
        where: {
            user_id: values.user_id
        }
    });

    return response;
}

const registerOrder = async (values) => {

    const productResponse = await Products.findOne({
        where: {
            id: values.product_id
        }
    });

    if (productResponse && (productResponse.product_quantity > 0 && productResponse.product_quantity >= values.product_quantity)) {
        const response = await OrderDetails.create({
            buyer_id: values.user_id,
            seller_id: values.seller_id,
            product_id: values.product_id,
            product_quantity: values.product_quantity,
            product_price: values.product_price,
            delivered: values.delivered,
            delivered_from: values.seller_address,
            delivered_to: values.current_user_address,
            paid: values.paid,
            payment_method: values.payment_method,
            time_for_delivery: values.time_for_delivery
        });

        if (response) {

            //Decreasing Order Quantity
            await Products.update({
                product_quantity: productResponse.product_quantity - values.product_quantity
            }, {
                where: {
                    id: values.product_id
                }
            });

            return "Order Registered";
        } else {
            return "Order Could Not Register";
        }

    } else {
        return "Product Quantity Exceeded!";
    }
};

module.exports = {
    getUserAllDetails,
    getUserByEmail,
    registerUser,
    registerGoogleUser,
    updateApplicationRating,
    getUserAddress,
    registerOrder
}
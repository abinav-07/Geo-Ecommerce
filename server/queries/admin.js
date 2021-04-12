const async = require("async");
const { User, Products, ProductImages, ProductDetails, OrderDetails, sequelize } = require("../models/index");

const { Op } = require("sequelize");

const getAllCustomerDetails = async () => {

    const response = await User.findAll({
        attributes: ["user_id", "first_name", "last_name", "email", "application_rating", "total_expenditure", "createdAt"],
        include: [{
            model: Products,
            as: "products",
            attributes: [
                ["id", "product_id"], "product_name", "is_used_product",
                "product_type", "product_price", "product_quantity", "product_sub_type", "seller_id",
            ],
            include: [{
                model: ProductImages,
                as: "product_images",
                attributes: [["id", "image_id"], "image", "product_id"]
            }, {
                model: ProductDetails,
                as: "product_details",
                attributes: [["id", "product_detail_id"], "product_detail", "product_id"],
            }]
        }, {
            model: OrderDetails,
            attributes: ["id", "buyer_id", "seller_id", "product_id", "product_quantity", "delivered", "paid", "payment_method","createdAt"],
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
        }]
    });

    return response;
}

const deleteCustomerDetails = async (user_id) => {
    try {
        const response = await sequelize.transaction(async (t) => {

            await Products.destroy({
                where: {
                    seller_id: user_id
                }
            }, { transaction: t });

            const deleteUser = await User.destroy({
                where: {
                    user_id: user_id
                }
            }, { transaction: t });

            return deleteUser;
        });
        return response;
    } catch (err) {
        return err;
    }

}

module.exports = {
    getAllCustomerDetails,
    deleteCustomerDetails
}
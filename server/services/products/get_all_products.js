const Joi = require("joi");
const Products = require("../../queries/products");

const getAllProducts = async (req, res) => {
    try {
        if (!req.query.user_id) {
            res.status(401).send("Missing user_id in query!")
        } else {
            const getAllProductsData = await Products.getAllProducts(req.query.user_id);
            res.status(200).json(getAllProductsData);
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getAllProducts
}
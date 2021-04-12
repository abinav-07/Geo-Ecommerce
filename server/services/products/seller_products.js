const Joi = require("joi");
const async = require("async");
const Products = require("../../queries/products");

const addSellerProducts = async (req, res) => {

    const schema = Joi.object({
        user_id: Joi.number().required(),
        productName: Joi.string().required(),
        usedProduct: Joi.string().required(),
        productType: Joi.string().required(),
        productSubType: Joi.string().required(),
        quantity: Joi.number().greater(0).required(),
        price: Joi.number().greater(0).required(),
        productDetails: Joi.string().required(),
    });

    try {
        const validateResponse = schema.validate(req.body, { abortEarly: false });
        if (validateResponse && validateResponse.error) res.status(400).send(validateResponse.error);


        const formData = {
            user_id: req.body.user_id,
            productName: req.body.productName,
            usedProduct: req.body.usedProduct,
            productType: req.body.productType,
            productSubType: req.body.productSubType,
            quantity: req.body.quantity,
            price: req.body.price,
            productDetails: req.body.productDetails,
            imagesList: req.files
        }

        if (!validateResponse.error) {
            //Add Product Details and Upload images
            async.waterfall([
                function (callback) {
                    Products.addSellerProducts(formData, callback);
                },
                function (arg1, callback) {
                    let imagesData = {
                        product_id: arg1.id,
                        imagesList: req.files
                    }
                    Products.addSellerProductsImages(imagesData, callback);
                },
                function (arg2, callback) {
                    let productDetailsData = {
                        product_id: arg2.product_id,
                        product_details: JSON.parse(req.body.productDetails),
                    }
                    Products.addSellerProductsDetails(productDetailsData, callback);
                }
            ], function (err, results) {
                if (err) {
                    res.status(400).json({ message: err });
                } else {
                    res.status(200).send("Product Added!");
                }
            }
            )
        }

    } catch (err) {
        console.log(err);
    }

}

const getAllSellerProducts = async (req, res) => {
    try {
        if (!req.query.user_id) {
            res.status(401).json({ message: "Missing user_id in query." });
        } else {
            const getAllSellerProductsData = await Products.getSellerProducts(req.query.user_id);
            res.status(200).json(getAllSellerProductsData);
        }
    } catch (err) {
        console.log(err);
    }
}

const getAllOrderDetails = async (req, res) => {

    if (req.query.user_id) {
        const getAllOrderDetailsData = await Products.getAllOrderDetails(req.query.user_id);
        res.status(200).send(getAllOrderDetailsData);
    } else {
        res.status(400).json({ message: "Missing user_id in query." });
    }
}

const deleteSellerProduct = async (req, res) => {
    const schema = Joi.object({
        user_id: Joi.number().required(),
        product_id: Joi.number().required()
    });

    try {
        const validateResponse = schema.validate(req.body, { abortEarly: false });

        if (validateResponse && validateResponse.error) res.status(400).send(validateResponse.error);

        if (!validateResponse.error) {
            const deleteProductResponse = await Products.deleteSellerProduct(req.body);

            if (deleteProductResponse) {
                res.status(200).send("Product Deleted!");
            }
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Cannot Delete" });
    };
}

const updateSellerProduct = async (req, res) => {
    const schema = Joi.object({
        user_id: Joi.number().required(),
        product_id: Joi.number().required(),
        product_quantity: Joi.number().greater(0).required()
    });

    try {
        const validateResponse = schema.validate(req.body, { abortEarly: false });
        if (validateResponse && validateResponse.error) res.status(400).send(validateResponse.error);

        if (!validateResponse.error) {
            const updateProductResponse = await Products.updateSellerProduct(req.body);
            if (updateProductResponse) {
                res.status(200).send("Product Updated!");
            }
        }
    } catch (err) {
        console.log(err);
    }
};

const updateSellerPaidDeliveredValues = async (req, res) => {
    const schema = Joi.object({
        order_detail_id: Joi.number().required(),
        paidValue: Joi.boolean().required(),
        deliveredValue: Joi.boolean().required()
    });
    const validateResponse = schema.validate(req.body, { abortEarly: false });
    try {
        if (validateResponse && validateResponse.error) res.status(400).send(validateResponse.error);
        if (!validateResponse.error) {
            const updateSellerPaidDeliveredResponse = await Products.updateSellerPaidDeliveredValues(req.body);
            if (updateSellerPaidDeliveredResponse) {
                res.status(200).send("Updated");
            }

        }
    } catch (err) {
        console.log(err);
    };

}

module.exports = {
    addSellerProducts,
    getAllSellerProducts,
    getAllOrderDetails,
    deleteSellerProduct,
    updateSellerProduct,
    updateSellerPaidDeliveredValues
}
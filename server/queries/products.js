const async = require("async");
const { User, Address, Products, ProductImages, ProductDetails, OrderDetails, sequelize } = require("../models/index");


const { Op } = require("sequelize");
const { UserAddOutlined } = require("@ant-design/icons");
/**
 * START
 * Below Function are for product addition
**/


const addSellerProducts = (productDetail, callback) => {
    const addNewSellerProduct = Products.create({
        seller_id: productDetail.user_id,
        product_name: productDetail.productName,
        is_used_product: productDetail.usedProduct == "no" ? "false" : "true",
        product_type: productDetail.productType,
        product_sub_type: productDetail.productSubType,
        product_quantity: productDetail.quantity,
        product_price: productDetail.price,
    });

    addNewSellerProduct.then(result => {
        callback(null, result);
    })
};

const addSellerProductsImages = (productImages, callback) => {
    let bulkImageList = [];
    productImages.imagesList.forEach(data => {
        bulkImageList.push({
            image: data.filename,
            product_id: productImages.product_id
        })
    });
    const addNewProductImages = ProductImages.bulkCreate(bulkImageList);

    addNewProductImages.then(result => {
        //Sending ProductImages to get product_id easily in next callback
        callback(null, productImages);
    })
}

const addSellerProductsDetails = (productDetails, callback) => {
    let bulkProductDetailList = [];
    productDetails.product_details.forEach(data => {
        bulkProductDetailList.push({
            product_detail: data.productDetail,
            product_id: productDetails.product_id
        });
    });

    const addNewProductDetails = ProductDetails.bulkCreate(bulkProductDetailList);

    addNewProductDetails.then(result => {
        //Sending Product Details to get product_id easily in next callback
        callback(null, result);
    })
}

/**
 * END
 * Product addition Functions End 
**/

const getSellerProducts = async (user_id) => {
    const getAllSellerProducts = await Products.findAll({
        where: {
            seller_id: user_id
        },
        order: [["id", "DESC"]],
        attributes: [["id", "product_id"], "product_name", "is_used_product", "product_type", "product_sub_type", "product_price", "product_quantity"],
        include: [{
            model: ProductImages,
            as: "product_images",
            attributes: [["id", "image_id"], "image", "product_id"]
        }, {
            model: ProductDetails,
            as: "product_details",
            attributes: [["id", "product_detail_id"], "product_detail", "product_id"],
        }]
    });
    const payload = {
        user_id: user_id,
        seller_products_details: getAllSellerProducts
    }
    return payload;
};

const getAllOrderDetails = async (user_id) => {
    const response = await OrderDetails.findAll({
        where: { seller_id: user_id },
        attributes: [["id", "order_detail_id"], "buyer_id", "seller_id", "product_id", "product_quantity", "product_price", "delivered", "paid", "payment_method", "createdAt"],
        include: [{
            model: Products,
            attributes: [["id", "product_id"], "product_name", "product_price"],
        }, {
            model: User,
            attributes: ["user_id", "first_name", "last_name", "email"],
        }]
    })

    return response;
}

const deleteSellerProduct = async (values) => {
    const response = await Products.destroy({
        where: {
            [Op.and]: [
                { id: values.product_id },
                { seller_id: values.user_id }
            ]
        }
    });
    return response;
}

const updateSellerProduct = async (values) => {
    const response = await Products.update({ product_quantity: values.product_quantity }, {
        where: {
            [Op.and]: [
                { id: values.product_id },
                { seller_id: values.user_id }
            ]
        }
    });
    return response;
}

const getAllProducts = async (user_id) => {
    const response = await sequelize.transaction(async (t) => {
        const AllProducts = await Products.findAll({
            where: {
                [Op.and]: [
                    {
                        seller_id: {
                            [Op.ne]: user_id
                        }
                    },
                    {
                        product_quantity: {
                            [Op.gt]: 0
                        }
                    }
                ]
            },
            attributes: [["id", "product_id"], "product_name", "is_used_product", "product_type", "product_price", "product_quantity", "product_sub_type", "seller_id"],
            include: [{
                model: User,
                as: "user_detail",
                include: [{
                    model: Address,
                    as: "address"
                }]
            },
            {
                model: ProductImages,
                as: "product_images",
                attributes: [["id", "image_id"], "image", "product_id"]
            }, {
                model: ProductDetails,
                as: "product_details",
                attributes: [["id", "product_detail_id"], "product_detail", "product_id"],
            }],

        });
        return AllProducts;
    });

    return response;
}

const updateSellerPaidDeliveredValues = async (values) => {
    const response = await OrderDetails.update({
        paid: values.paidValue,
        delivered: values.deliveredValue,
    },
        {
            where: { id: values.order_detail_id }
        });

    return response;
};

module.exports = {
    addSellerProducts,
    addSellerProductsImages,
    addSellerProductsDetails,
    getSellerProducts,
    getAllOrderDetails,
    deleteSellerProduct,
    updateSellerProduct,
    getAllProducts,
    updateSellerPaidDeliveredValues
}
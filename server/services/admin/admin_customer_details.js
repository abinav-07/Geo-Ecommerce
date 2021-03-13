const Joi = require("joi");
const AdminQueries = require("../../queries/admin");

const getAllCustomerDetails = async (req, res) => {
    try {
        const getAllCustomerDetailsData = await AdminQueries.getAllCustomerDetails();
        res.status(200).json(getAllCustomerDetailsData);
    } catch (err) {
        console.log(err);
    }
};

const deleteCustomer = async (req, res) => {
    try {
        if (req.body.user_id) {
            const deleteCustomerData = await AdminQueries.deleteCustomerDetails(req.body.user_id);
            console.log(deleteCustomerData);
            if (deleteCustomerData) {
                res.status(200).send("User Deleted!");
            } else {
                res.status(400).json({ message: "Error!" });
            }

        } else {
            res.status(400).json({ message: "Missing user_id in body!" });
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getAllCustomerDetails,
    deleteCustomer
}

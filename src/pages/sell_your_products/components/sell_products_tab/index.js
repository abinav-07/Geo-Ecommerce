import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col, Select, Input, Button, message, notification } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import ProductDetailTable from './productDetailTable';
import UploadProductImages from './uploadImageComponent';
import { SELL_YOUR_PRODUCTS_PRODUCT_TYPES } from '../../../../enums';
import { addSellerProducts, onAddSellerProductsReset } from '../../../../redux';

//Import Styles
import {
    SellProductsMainDiv
} from './style';

const SellProductsTab = () => {

    //States
    const [totalImages, setTotalImages] = useState([]);
    const [productDetails, setProductDetails] = useState([]);

    const dispatch = useDispatch();

    const user_id = useSelector(state => state.user.user?.user_id);
    const addingProduct = useSelector(state => state.addSellerProducts?.addingSellerProducts);
    const addingSellerProductsSuccess = useSelector(state => state.addSellerProducts?.addingSellerProductsSuccess);
    const addingSellerProductsError = useSelector(state => state.addSellerProducts?.addingSellerProductsError);

    useEffect(() => {
        dispatch(onAddSellerProductsReset());
    });

    /* Notifications Use Effect*/
    useEffect(() => {

        addingSellerProductsSuccess && (
            notification.success({
                message: addingSellerProductsSuccess,
                duration: 3
            })
        )



        addingSellerProductsError && (
            notification.error({
                message: addingSellerProductsError,
                duration: 3
            })
        )

    }, [addingSellerProductsSuccess, addingSellerProductsError])

    const [form] = Form.useForm();
    //Form Finish
    const onFinish = (values) => {
        totalImages.length === 0 && message.error("Atleast one image is required.");
        productDetails.length === 0 && message.error("Atleast one product detail is required.");

        if (totalImages.length != 0 && productDetails.length != 0) {

            const formData = new FormData();

            formData.append("user_id", user_id);
            formData.append("productName", values.productName);
            formData.append("usedProduct", values.usedProduct);
            formData.append("productType", values.productType);
            formData.append("productSubType", values.productSubType);
            formData.append("quantity", values.quantity);
            formData.append("price", values.price);
            formData.append("productDetails", JSON.stringify(productDetails));
            totalImages.forEach(image => {
                formData.append("imagesList", image);
            });
            dispatch(addSellerProducts(formData));
            //Clearing Fields and Arrays
            form.resetFields()
            setTotalImages([])
            setProductDetails([])
        }
    }

    const onFinishFailed = ({ errorFields }) => {
        if (errorFields) {
            message.error("All required fields must be filled.");
        }
    }

    const initialValues = {
        usedProduct: "no"
    };

    return (
        <>
            <SellProductsMainDiv>
                <Form
                    form={form}
                    id="sellProductsForm"
                    labelCol={{
                        md: { span: 9 },
                        xs: { span: 9 }
                    }}
                    wrapperCol={{
                        md: { span: 14 },
                        xs: { span: 14 }
                    }}
                    name="sellProductsForm"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={initialValues}
                >

                    <h1>Product Informations</h1>


                    <Row gutter={24}>
                        <Col
                            md={12}
                            xs={24}
                        >
                            <Form.Item
                                label="Product Name"
                                name="productName"
                                rules={[{ required: true }]}
                            >
                                <Input placeholder="Enter Product Name" />
                            </Form.Item>
                        </Col>
                        <Col
                            md={12}
                            xs={24}
                        >
                            <Form.Item
                                label="Used Product"
                                name="usedProduct"
                            >
                                <Select>
                                    <Select.Option value="yes">Yes</Select.Option>
                                    <Select.Option value="no">No</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            md={12}
                            xs={24}
                        >
                            <Form.Item
                                label="Product Type"
                                name="productType"
                                rules={[{ required: true }]}
                            >
                                <Select required>
                                    {SELL_YOUR_PRODUCTS_PRODUCT_TYPES.map((data, i) => (
                                        <Select.Option key={i} value={data.value}>{data.name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col
                            md={12}
                            xs={24}
                        >
                            <Form.Item
                                label="Product Sub Type"
                                name="productSubType"
                                rules={[{ required: true }]}
                            >
                                <Select
                                    showSearch
                                >
                                    {SELL_YOUR_PRODUCTS_PRODUCT_TYPES.map((type, i) => (
                                        <Select.OptGroup label={type.name} key={i}>
                                            {type.subGroup.map((subType, j) => {
                                                return <Select.Option key={subType.value} value={subType.value}>{subType.name}</Select.Option>
                                            })}
                                        </Select.OptGroup>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            md={12}
                            xs={24}
                        >
                            <Form.Item
                                label="Quantity"
                                name="quantity"
                                rules={[{ required: true }]}
                            >
                                <Input type="number" placeholder="Products Available" />
                            </Form.Item>
                        </Col>
                        <Col
                            md={12}
                            xs={24}
                        >
                            <Form.Item
                                label="Price"
                                name="price"
                                rules={[{ required: true }]}
                            >
                                <Input placeholder="Product Price" type="number" prefix={<DollarOutlined style={{ fontSize: "1rem", paddingRight: "5px" }} />} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <ProductDetailTable productDetails={productDetails} setProductDetails={setProductDetails} />
                    <h1 style={{ margin: "30px 0px" }}>Upload Product Images</h1>
                    {/* <Form.Item> */}
                    <UploadProductImages totalImages={totalImages} setTotalImages={setTotalImages} />
                    {/* </Form.Item> */}

                    <Form.Item
                        wrapperCol={{
                            span: 24
                        }}
                    >
                        <Button
                            htmlType="submit"
                            type="primary"
                            style={{
                                float: "right",
                                marginTop: "40px"
                            }}
                            className="form-submit"
                            loading={addingProduct}
                        >
                            Submit
                        </Button>
                    </Form.Item>

                </Form>
            </SellProductsMainDiv>
        </>
    );
}

export default SellProductsTab;
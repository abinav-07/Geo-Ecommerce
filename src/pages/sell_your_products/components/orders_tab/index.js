import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table, Alert, Button, Modal, Select, notification } from 'antd';
import $ from 'jquery';
import axios from 'axios';
import { API_URL } from '../../../../config';
import { getAllOrderDetails } from '../../../../redux';


const SellerOrderTab = () => {
    const dispatch = useDispatch();

    const userId = useSelector(state => state.user.user?.user_id);

    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalProduct, setModalProduct] = useState(null);
    const [paidValue, setPaidValue] = useState(null);
    const [deliveredValue, setDeliveredValue] = useState(null);

    const gettingAllOrderDetails = useSelector(state => state?.sellerAllProducts?.gettingAllOrderDetails);
    const gettingAllOrderDetailsError = useSelector(state => state?.sellerAllProducts?.gettingAllOrderDetailsError);
    const allOrderedProducts = useSelector(state => state?.sellerAllProducts?.allOrderDetails);

    useEffect(() => {
        const filteredProducts = allOrderedProducts?.filter((data, index) => (
            !data?.paid || !data?.delivered
        ));

        setProducts(filteredProducts);

    }, [allOrderedProducts]);

    const handleOnClick = (record) => {
        setModalProduct(record);
        setPaidValue(record.paid);
        setDeliveredValue(record.delivered);
        setShowModal(true);
    }

    const updatePaymentInformation = () => {

        const values = {
            order_detail_id: modalProduct.key,
            paidValue: paidValue,
            deliveredValue: deliveredValue
        };

        axios.post(`${API_URL}/users/update-seller-paid-values`, values)
            .then(res => {
                notification.success({
                    message: res.data,
                    duration: 5
                });

                dispatch(getAllOrderDetails(userId));
            })
            .catch(err => {

                notification.error({
                    message: err.response.data?.details[0]["message"],
                    duration: 5
                })
            })
    }

    const closeModal = () => {
        setModalProduct(null);
        setShowModal(false);
    }

    const columns = [
        {
            title: "Customer Name",
            dataIndex: "customerName",
            key: "customerName",
        },
        {
            title: "Customer Email",
            dataIndex: "customerEmail",
            key: "customerEmail"
        },
        {
            title: "Product Name",
            dataIndex: "productName",
            key: "productName"
        },
        {
            title: "Quantity Ordered",
            dataIndex: "quantityOrdered",
            key: "quantityOrdered"
        },
        {
            title: "Price Paid",
            dataIndex: "pricePaid",
            key: "pricePaid"
        },
        {
            title: "Payment Method",
            dataIndex: "paymentMethod",
            key: "paymentMethod"
        },
        {
            title: "Paid",
            dataIndex: "paid",
            key: "paid",
            render: (text, record, index) => {
                return (
                    <Select
                        style={{ width: "100%" }}
                        value={record?.paid ? "paid" : "notPaid"}
                        onClick={() => { handleOnClick(record) }}
                    >
                        <Select.Option value="paid">Paid</Select.Option>
                        <Select.Option value="notPaid">Not Paid</Select.Option>
                    </Select>
                )
            }
        },
        {
            title: "Delivered",
            dataIndex: "delivered",
            key: "delivered",
            render: (text, record, index) => {
                return (
                    <Select
                        style={{ width: "100%" }}
                        value={record?.delivered ? "Delivered" : "notDelivered"}
                        onClick={() => { handleOnClick(record) }}
                    >
                        <Select.Option value="delivered">Delivered</Select.Option>
                        <Select.Option value="notDelivered">Not Delivered</Select.Option>
                    </Select>
                )
            }
        },
        {
            title: "Ordered At",
            dataIndex: "orderedAt",
            key: "orderedAt"
        }
    ];

    const tableData = products?.map((data, index) => ({
        key: data?.order_detail_id,
        customerName: `${data?.User?.first_name} ${data?.User?.last_name ? data?.User?.last_name : ""}`,
        customerEmail: data?.User?.email,
        productName: data?.Product?.product_name,
        productPrice: data?.Product?.product_price,
        pricePaid: data?.product_price,
        quantityOrdered: data?.product_quantity,
        paymentMethod: data?.payment_method,
        paid: data?.paid,
        delivered: data?.delivered,
        orderedAt: data?.createdAt ? new Date(data.createdAt).toLocaleString() : "",
    }));

    return (
        <div
            style={{
                backgroundColor: "white"
            }}
        >
            {gettingAllOrderDetailsError &&
                (
                    window.scrollTo(0, 0),
                    <Alert type="error" message={gettingAllOrderDetailsError} banner closable />
                )
            }

            <Table
                columns={columns}
                dataSource={tableData}
                loading={gettingAllOrderDetails}
                bordered
                style={{
                    overflow: "auto"
                }}
            />
            {modalProduct ?
                (
                    <Modal
                        title={`Update Customer ${modalProduct?.customerName}`}
                        visible={showModal}
                        maskClosable={false}
                        onOk={updatePaymentInformation}
                        onCancel={closeModal}
                    >
                        <Row>
                            <Col md={6}
                                xs={10}
                                style={{ marginBottom: "20px" }}
                            >
                                <h4>Product Name:</h4>
                            </Col>
                            <Col md={8}
                                xs={12}>
                                {modalProduct?.productName}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}
                                xs={10}
                                style={{ marginBottom: "20px" }}
                            >
                                <h4>Ordered At:</h4>
                            </Col>
                            <Col md={8}
                                xs={12}>
                                {modalProduct?.orderedAt}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}
                                xs={10}
                                style={{ marginBottom: "20px" }}
                            >
                                <h4>Paid:</h4>
                            </Col>
                            <Col md={8}
                                xs={12}>
                                <Select
                                    id="paid-select-tag"
                                    style={{ width: "100%" }}
                                    defaultValue={modalProduct?.paid ? "paid" : "notPaid"}
                                    onChange={(values) => { setPaidValue(values == "paid" ? true : false) }}
                                >
                                    <Select.Option value="paid">Paid</Select.Option>
                                    <Select.Option value="notPaid">Not Paid</Select.Option>
                                </Select>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}
                                xs={10}
                            >
                                Delivered:
                            </Col>
                            <Col md={8}
                                xs={12}>
                                <Select
                                    id="delivered-select-tag"
                                    style={{ width: "100%" }}
                                    defaultValue={modalProduct.delivered ? "delivered" : "notDelivered"}
                                    onChange={(values) => { setDeliveredValue(values == "delivered" ? true : false) }}
                                >
                                    <Select.Option value="delivered">Delivered</Select.Option>
                                    <Select.Option value="notDelivered">Not Delivered</Select.Option>
                                </Select>
                            </Col>
                        </Row>
                    </Modal>
                ) :
                (
                    <>
                    </>
                )
            }
        </div >
    )

}

export default SellerOrderTab;
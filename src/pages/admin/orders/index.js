import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCustomerDetails } from '../../../redux';
import { notification } from 'antd';
import { Table } from "ant-table-extensions";
import { SearchOutlined } from '@ant-design/icons';

const AdminOrdersPage = () => {
    const dispatch = useDispatch();
    const gettingAllCustomerDetailsBool = useSelector(state => state.adminCustomerDetails?.gettingAllCustomerDetails);
    const gettingAllCustomerDetailsError = useSelector(state => state.adminCustomerDetails?.gettingAllCustomerDetailsError);
    const allCustomerDetails = useSelector(state => state.adminCustomerDetails?.customerDetails);

    useEffect(() => {
        dispatch(getAllCustomerDetails());
    }, []);

    useEffect(() => {
        gettingAllCustomerDetailsError &&
            (
                notification.error({
                    message: gettingAllCustomerDetailsError,
                    duration: 3
                })
            )
    }, [gettingAllCustomerDetailsError]);

    const columns = [
        {
            title: "All Orders",
            children: [
                {
                    title: "Customer Name",
                    dataIndex: "customerName",
                    key: "customerName"
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
                    title: "Seller Name",
                    dataIndex: "sellerName",
                    key: "sellerName"
                },
                {
                    title: "Seller Email",
                    dataIndex: "sellerEmail",
                    key: "sellerEmail"
                },
                {
                    title: "Quantity Ordered",
                    dataIndex: "orderedQuantity",
                    key: "orderedQuantity"
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
                            record?.paid ?
                                <span style={{ color: "green" }}>Paid</span>
                                :
                                <span style={{ color: "red" }}>Not Paid</span>
                        )
                    }
                },
                {
                    title: "Delivered",
                    dataIndex: "delivered",
                    key: "delivered",
                    render: (text, record, index) => {                        
                        return (
                            record?.delivered ?
                                <span style={{ color: "green" }}>Delivered</span>
                                :
                                <span style={{ color: "red" }}>Not Delivered</span>
                        )
                    }
                },
                {
                    title: "Ordered At",
                    dataIndex: "orderedAt",
                    key: "orderedAt"
                }
            ]
        }
    ];

    const tableData = allCustomerDetails?.filter((data) => (data?.order_details?.length > 0)).flatMap((data, i) => (
        data?.order_details?.map((orderData, j) => (
            {
                key: orderData?.id,
                customerName: `${data?.first_name} ${data?.last_name ? data.last_name : ""}`,
                customerEmail: data?.email,
                sellerName: `${orderData?.Product?.user_detail?.first_name || ""} ${data?.Product?.user_detail?.last_name || ""}`,
                sellerEmail: orderData?.Product?.user_detail?.email,
                productName: orderData?.Product?.product_name,
                orderedQuantity: orderData?.product_quantity,
                paymentMethod: orderData?.payment_method,
                paid: orderData?.paid,
                delivered: orderData?.delivered,
                orderedAt: orderData?.createdAt ? new Date(orderData?.createdAt).toLocaleString() : ""
            }))
    )
    );


    return (
        <Table
            columns={columns}
            dataSource={tableData}
            loading={gettingAllCustomerDetailsBool}
            searchableProps={{
                inputProps: {
                    prefix: <SearchOutlined />,
                    style: {
                        width: "200px"
                    }
                }
            }}
        />
    )
}

export default AdminOrdersPage;
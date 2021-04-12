import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'antd';

const UserOrdersTab = () => {
    const [userOrderDetails, setUserOrderDetails] = useState(null);

    const User = useSelector(state => state.user?.user);

    useEffect(() => {
        const mappedOrderDetails = User?.order_details?.map((data, index) => ({
            key: index,
            orderedQuantity: data?.product_quantity,
            delivered: data?.delivered,
            paid: data?.paid,
            paymentMethod: data?.payment_method,
            productName: data?.Product?.product_name,
            sellerName: `${data?.Product?.user_detail?.first_name || ""} ${data?.Product?.user_detail?.last_name || ""}`,
            sellerEmail: data?.Product?.user_detail?.email
        }));

        setUserOrderDetails(mappedOrderDetails);

        console.log(userOrderDetails);

    }, [User]);

    const columns = [
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
        }
    ];

    return (
        <Table
            columns={columns}
            dataSource={userOrderDetails}
        />
    )
};

export default UserOrdersTab;
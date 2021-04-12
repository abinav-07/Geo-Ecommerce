import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Row, Col, Table, Alert } from 'antd';

const SoldProductsTab = () => {
    const [products, setProducts] = useState([]);

    const gettingAllOrderDetails = useSelector(state => state?.sellerAllProducts?.gettingAllOrderDetails);
    const gettingAllOrderDetailsError = useSelector(state => state?.sellerAllProducts?.gettingAllOrderDetailsError);
    const allOrderedProducts = useSelector(state => state?.sellerAllProducts?.allOrderDetails);

    useEffect(() => {
        const filteredProducts = allOrderedProducts?.filter((data, index) => (
            data?.paid && data?.delivered
        ));

        setProducts(filteredProducts);
    }, [allOrderedProducts]);


    const columns = [
        {
            title: "Product Name",
            dataIndex: "productName",
            key: "productName"
        },
        {
            title: "Product Price",
            dataIndex: "productPrice",
            key: "productPrice"
        },
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

        </div>
    )

}

export default SoldProductsTab;
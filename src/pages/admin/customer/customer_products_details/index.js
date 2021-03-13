import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Table, Button, Image, Modal, Input, message, notification } from 'antd';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { CustomerProductsDiv } from './style';
import { deleteSellerProduct, onDeleteSellerProductReset } from '../../../../redux';
import $ from 'jquery';
import { Table as ExtendedTable } from "ant-table-extensions";

const AdminCustomerProductDetails = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const deletingSellerProductSuccess = useSelector(state => state.addSellerProducts?.deletingSellerProductSuccess);
    const deletingSellerProductError = useSelector(state => state.addSellerProducts?.deletingSellerProductError);
    const user_name = history.location.state?.user_details?.name || null;
    const user_id = history.location.state?.user_details?.user_id || null;
    const user_products = history.location.state?.user_details?.products;

    const [products, setProducts] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteModalInput, setDeleteModalInput] = useState("");
    const [productIdToDelete, setProductIdToDelete] = useState(null);
    const [productNameToDelete, setProductNameToDelete] = useState(null);

    useEffect(() => {
        dispatch(onDeleteSellerProductReset());
    });

    useEffect(() => {
        if (!history.location.state) {
            history.push("/admin/customers");
        }
    }, []);

    useEffect(() => {
        setProducts(user_products);
    }, [user_products]);

    //Notifications Use Effects
    useEffect(() => {
        deletingSellerProductSuccess &&
            (
                notification.success({
                    message: deletingSellerProductSuccess,
                    duration: 3
                })
            )

        deletingSellerProductError &&
            (
                notification.error({
                    message: deletingSellerProductError,
                    duration: 3
                })
            )
    }, [
        deletingSellerProductSuccess,
        deletingSellerProductError,
    ]);

    const openDeleteModal = (data) => {
        setProductIdToDelete(data.product_id);
        setProductNameToDelete(data.productName);
        setShowDeleteModal(true);
    };

    const deleteProduct = () => {
        const value = {
            user_id: user_id,
            product_id: productIdToDelete
        }

        if (deleteModalInput === "DELETE") {
            dispatch(deleteSellerProduct(value));
            let filteredProducts = products?.filter(data => data.product_id !== value.product_id);
            setProducts([...filteredProducts]);
            setProductIdToDelete(null);
            setProductNameToDelete(null);
            setDeleteModalInput(null);
            setShowDeleteModal(false);
        } else {
            $("#modal-input").css({
                "borderColor": "red"
            });
        }
    };

    const cancelDelete = () => {
        setProductIdToDelete(null);
        setProductNameToDelete(null);
        setShowDeleteModal(false);
    }

    const columns = [
        {
            title: `${user_name}'s Products`,
            children: [
                {
                    title: 'Product Name',
                    dataIndex: "productName",
                    key: "productName",
                },
                {
                    title: 'Product Quantity',
                    dataIndex: "productQuantity",
                    key: "productQuantity",
                },
                {
                    title: 'Product Type',
                    dataIndex: "productType",
                    key: "productType",

                },
                {
                    title: 'Product Sub Type',
                    dataIndex: "productSubType",
                    key: "productSubType",

                },
                {
                    title: 'Images',
                    dataIndex: 'images',
                    key: "images",
                    responsive: ['md'],
                    width: 200,
                    ellipsis: {
                        showTitle: true,
                    },
                    render: (text, record, index) => {
                        return (
                            <>
                                <Image.PreviewGroup
                                    style={{
                                        width: "400"
                                    }}
                                >
                                    {record?.productImages?.map((data, i) => (
                                        <Image
                                            style={{
                                                padding: "5px"
                                            }}
                                            key={i}
                                            width={100}
                                            src={require(`../../../../assests/images/product_images/${data?.image ? data?.image : ""}`).default || ""}
                                        />
                                    ))}
                                </Image.PreviewGroup>
                            </>
                        );
                    }
                },
                {
                    title: "Action",
                    dataIndex: "action",
                    key: "action",
                    align: "center",
                    render: (text, record, index) =>

                    (
                        <Button
                            type="danger"
                            icon={<DeleteOutlined />}
                            onClick={() => {
                                openDeleteModal(record);
                            }}
                        />
                    )
                }
            ]
        }
    ];

    const expandedRow = (data) => {
        const columns = [
            {
                title: "S.N",
                dataIndex: "key",
                key: "key",
                width: 280,
            },
            {
                title: "Product Details",
                dataIndex: "productDetail",
                key: "productDetail",
            }
        ];

        const tableData = data?.productDetails?.map((detail, index) => ({
            key: index + 1,
            productDetail: detail?.product_detail
        }));

        return <Table columns={columns} dataSource={tableData} pagination={false} />;
    }


    const tableData = products?.map((data, index) => ({
        key: index,
        user_id: user_id,
        product_id: data?.product_id,
        productName: data?.product_name,
        productQuantity: data?.product_quantity,
        productType: data?.product_type,
        productSubType: data?.product_sub_type,
        productImages: data?.product_images,
        productDetails: data?.product_details
    }));


    return (
        <CustomerProductsDiv>
            <ExtendedTable
                columns={columns}
                dataSource={tableData}
                expandable={{
                    expandedRowRender: record => (
                        expandedRow(record)
                    )
                }}
                searchableProps={{
                    inputProps: {
                        prefix: <SearchOutlined />,
                        style: {
                            width: "200px"
                        }
                    }
                }}
            />
            <Modal
                title={`Delete Product ${productNameToDelete}`}
                visible={showDeleteModal}
                onOk={deleteProduct}
                onCancel={cancelDelete}
                maskClosable={false}
            >
                <p>DELETING THE PRODUCT WILL DELETE ALL ITS IMAGES AND DETAILS.</p>
                <p>TYPE "DELETE" AND CLICK OK BELOW TO DELETE.</p>
                <Input
                    id="modal-input"
                    value={deleteModalInput}
                    onChange={(e) => {
                        $("#modal-input").css({
                            "borderColor": "black"
                        });
                        setDeleteModalInput(e.target.value);
                    }}
                >
                </Input>
            </Modal>
        </CustomerProductsDiv>
    )
}

export default AdminCustomerProductDetails;
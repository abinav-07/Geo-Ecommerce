import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Alert, Button, Image, Modal, Input, message, notification } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { deleteSellerProduct, onDeleteSellerProductReset, updateSellerProduct, onUpdateSellerProductReset, getAllSellerProducts } from '../../../../redux';
import $ from 'jquery';

const SellerStoreTab = () => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [deleteModalInput, setDeleteModalInput] = useState("");
    const [productIdToDelete, setProductIdToDelete] = useState(null);
    const [productNameToDelete, setProductNameToDelete] = useState(null);
    const [productNameToUpdate, setProductNameToUpdate] = useState(null);
    const [productIdToUpdate, setProductIdToUpdate] = useState(null);
    const [productQuantityToUpdate, setProductQuantityToUpdate] = useState(null);

    const [products, setProducts] = useState([]);

    const dispatch = useDispatch();

    const user = useSelector(state => state.user?.user);
    const gettingSellerAllProducts = useSelector(state => state.sellerAllProducts?.gettingAllSellerProducts);
    const gettingAllSellerProductsError = useSelector(state => state.sellerAllProducts?.gettingAllSellerProductsError);
    const allSellerProducts = useSelector(state => state.sellerAllProducts?.allSellerProducts);
    const deletingSellerProductSuccess = useSelector(state => state.addSellerProducts?.deletingSellerProductSuccess);
    const deletingSellerProductError = useSelector(state => state.addSellerProducts?.deletingSellerProductError);
    const updatingSellerProductSuccess = useSelector(state => state.addSellerProducts?.updatingSellerProductSuccess);
    const updatingSellerProductError = useSelector(state => state.addSellerProducts?.updatingSellerProductError);


    useEffect(() => {
        dispatch(onDeleteSellerProductReset());
        dispatch(onUpdateSellerProductReset());
    })

    //Table Data
    useEffect(() => {
        setProducts(allSellerProducts?.seller_products_details);
    }, [allSellerProducts]);


    useEffect(() => {
        const userId = user?.user_id;
        dispatch(getAllSellerProducts(userId));
    }, [updatingSellerProductSuccess])

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


        updatingSellerProductSuccess &&
            (
                notification.success({
                    message: updatingSellerProductSuccess,
                    duration: 3
                })
            )


        updatingSellerProductError &&
            (
                notification.error({
                    message: updatingSellerProductError,
                    duration: 3
                })
            )

    }, [
        deletingSellerProductSuccess,
        deletingSellerProductError,
        updatingSellerProductSuccess,
        updatingSellerProductError
    ]);


    const openDeleteModal = (data) => {
        setProductIdToDelete(data.productId);
        setProductNameToDelete(data.productName);
        setShowDeleteModal(true);
    }

    const deleteProduct = () => {
        const user_id = allSellerProducts?.user_id;

        const value = {
            user_id: user_id,
            product_id: productIdToDelete
        }

        if (deleteModalInput === "DELETE") {
            dispatch(deleteSellerProduct(value));

            let allSellerProductsFiltered = products?.filter(data => data.product_id !== value.product_id);

            setProducts([...allSellerProductsFiltered]);
            setProductIdToDelete(null);
            setProductNameToDelete(null);
            setDeleteModalInput(null);
            setShowDeleteModal(false);
        } else {
            $("#modal-input").css({
                "borderColor": "red"
            });
        }
    }

    const cancelDelete = () => {
        setProductIdToDelete(null);
        setProductNameToDelete(null);
        setShowDeleteModal(false);
    }

    const openUpdateModal = (data) => {
        setProductIdToUpdate(data.productId);
        setProductNameToUpdate(data.productName);
        setProductQuantityToUpdate(data.productQuantity);
        setShowUpdateModal(true);
    }

    const updateProduct = () => {
        const user_id = allSellerProducts?.user_id;
        const value = {
            user_id: user_id,
            product_id: productIdToUpdate,
            product_quantity: productQuantityToUpdate
        }
        dispatch(updateSellerProduct(value));
        setShowUpdateModal(false);
    }

    const cancelUpdate = () => {
        setProductIdToUpdate(null);
        setProductNameToUpdate(null);
        setProductQuantityToUpdate(null);
        setShowUpdateModal(false);
    }

    const columns = [
        {
            title: 'Product Name',
            dataIndex: "productName",
            key: "productName",
        },
        {
            title: 'Product Quantity',
            dataIndex: "productQuantity",
            key: "productQuantity",
            render: (text, record, index) => {
                return (
                    <Input value={record.productQuantity}
                        onClick={() => { openUpdateModal(record) }}
                    ></Input>
                )
            }
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

    const tableData = products?.map((data, index) => ({
        key: index,
        productName: data?.product_name,
        productQuantity: data?.product_quantity,
        productType: data?.product_type,
        productSubType: data?.product_sub_type,
        productId: data?.product_id,
        productImages: data?.product_images
    }));
    return (
        <div
            style={{
                backgroundColor: "white"
            }}
        >
            {/* Alerts */}
            {gettingAllSellerProductsError &&
                (
                    window.scrollTo(0, 0),
                    <Alert type="error" message={gettingAllSellerProductsError} banner closable />
                )
            }

            <Table
                columns={columns}
                loading={gettingSellerAllProducts}
                dataSource={tableData}
                bordered
                style={{
                    overflow: "auto"
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
            <Modal
                title={`Upload Product ${productNameToUpdate}`}
                visible={showUpdateModal}
                onOk={updateProduct}
                onCancel={cancelUpdate}
                maskClosable={false}
            >
                <p>Product Quantity</p>
                <Input
                    type="number"
                    min={0}
                    value={productQuantityToUpdate}
                    onChange={(e) => {
                        setProductQuantityToUpdate(e.target.value);
                    }}
                >
                </Input>
            </Modal>
        </div>
    );
}

export default SellerStoreTab;
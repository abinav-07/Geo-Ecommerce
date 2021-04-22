import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, notification, Button, Input, Modal } from "antd";
import { Table as ExtendedTable } from "ant-table-extensions";
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { getAllCustomerDetails, deleteCustomer, onDeletingCustomerReset } from '../../../redux';
import { CustomerDetails, CustomerProductButton, ActionDiv } from './style';
import { Link } from 'react-router-dom';
import { ADMIN_NAV_BAR_KEYS } from '../../../enums';
import $ from 'jquery';

const AdminCustomerPage = () => {
    const dispatch = useDispatch();

    const gettingAllCustomerDetailsBool = useSelector(state => state.adminCustomerDetails?.gettingAllCustomerDetails);
    const gettingAllCustomerDetailsError = useSelector(state => state.adminCustomerDetails?.gettingAllCustomerDetailsError);
    const allCustomerDetails = useSelector(state => state.adminCustomerDetails?.customerDetails);

    const deletingCustomerBool = useSelector(state => state.adminCustomerDetails?.deletingCustomer);
    const deletingCustomerSuccess = useSelector(state => state.adminCustomerDetails?.deletingCustomerSuccess);
    const deletingCustomerError = useSelector(state => state.adminCustomerDetails?.deletingCustomerError);
    const deletingSellerProductBool = useSelector(state => state.addSellerProducts?.deletingSellerProduct);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteModalInput, setDeleteModalInput] = useState("");
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [userNameToDelete, setUserNameToDelete] = useState(null);

    useEffect(() => {
        dispatch(onDeletingCustomerReset());
    });

    useEffect(() => {
        dispatch(getAllCustomerDetails());
    }, [deletingCustomerSuccess, deletingSellerProductBool]);

    useEffect(() => {
        gettingAllCustomerDetailsError &&
            (
                notification.error({
                    message: gettingAllCustomerDetailsError,
                    duration: 3
                })
            )
    }, [gettingAllCustomerDetailsError]);

    useEffect(() => {
        deletingCustomerSuccess &&
            (
                notification.success({
                    message: deletingCustomerSuccess,
                    duration: 3
                })
            );

        deletingCustomerError &&
            (
                notification.error({
                    message: deletingCustomerError,
                    duration: 3
                })
            );

    }, [deletingCustomerSuccess, deletingCustomerError])


    const openDeleteModal = (data) => {
        setUserIdToDelete(data.user_id);
        setUserNameToDelete(data.name);
        setShowDeleteModal(true);
    };

    const deleteUser = () => {
        const value = {
            user_id: userIdToDelete,
        }

        if (deleteModalInput === "DELETE") {
            dispatch(deleteCustomer(value));
            setUserIdToDelete(null);
            setUserNameToDelete(null);
            setDeleteModalInput(null);
            setShowDeleteModal(false);
        } else {
            $("#modal-input").css({
                "borderColor": "red"
            });
        }
    };

    const cancelDelete = () => {
        setUserNameToDelete(null);
        setUserIdToDelete(null);
        setShowDeleteModal(false);
    }

    const columns = [
        {
            title: "Customer Details",
            children: [
                {
                    title: "Name",
                    dataIndex: "name",
                    key: "name",
                },
                {
                    title: "Email",
                    dataIndex: "email",
                    key: "email"
                },
                {
                    title: "Joined In",
                    dataIndex: "date",
                    key: "date"
                },
                {
                    title: "Action",
                    dataIndex: "action",
                    key: "action",
                    align: "center",
                    render: (text, record, index) => {
                        return (
                            <ActionDiv>
                                <CustomerProductButton>
                                    <Link
                                        to={{
                                            pathname: `/admin/${ADMIN_NAV_BAR_KEYS.CUSTOMER_DETAILS}/product-details`,
                                            state: { user_details: record }
                                        }}
                                    >
                                        Products ({record?.products?.length})
                                    </Link>
                                </CustomerProductButton>
                                <Button
                                    type="danger"
                                    icon={<DeleteOutlined />}
                                    onClick={() => {
                                        openDeleteModal(record);
                                    }}
                                />
                            </ActionDiv>
                        )
                    }
                },
            ]
        }
    ];

    const tableData = allCustomerDetails?.map((data, i) => ({
        key: i,
        user_id: data?.user_id,
        name: `${data?.first_name} ${data?.last_name ? data.last_name : ""}`,
        email: data?.email,
        date: data?.createdAt ? new Date(data.createdAt).toLocaleString() : "",
        products: data?.products
    }));

    return (
        <CustomerDetails>
            <ExtendedTable
                dataSource={tableData}
                columns={columns}
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
            <Modal
                title={`Delete User ${userNameToDelete}`}
                visible={showDeleteModal}
                onOk={deleteUser}
                onCancel={cancelDelete}
                maskClosable={false}
            >
                <p>DELETING THE USER WILL DELETE ALL THE USER'S DETAILS AND PRODUCTS.</p>
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
        </CustomerDetails>
    )
}

export default AdminCustomerPage;
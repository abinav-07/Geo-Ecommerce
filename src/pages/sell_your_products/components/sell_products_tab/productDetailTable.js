import { useRef } from 'react';
import { Table, Button, Row, Col, Input,Form } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

const ProductDetailTable = ({ productDetails, setProductDetails }) => {

    const detailInputRef = useRef("");

    const handleAddDetail = () => {
        const inputValue = detailInputRef.current.state.value;
        if (!inputValue || inputValue.trim() == "") {
            detailInputRef.current.input.style.border = "1px solid red";
        } else {
            setProductDetails((prevState) => [...prevState, {
                productDetail: inputValue,
                uid: uuid()
            }]);
            //Clear Input Field            
            detailInputRef.current.state.value="";
        }
    }

    //Detail Table Columns
    const productDetailColumns = [
        {
            title: "Details",
            dataIndex: "details",
            key: "details",

        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            width: "20%",
            align: "center",
            render: (text, record, index) => (
                <Button
                    type="primary"
                    icon={<DeleteOutlined />}
                    onClick={() => {

                        // Remove Details                        
                        let removedDetailsArr = productDetails.filter(data => data.uid != record.uid);
                        setProductDetails(removedDetailsArr);
                    }}
                />
            )
        }

    ];

    const productDetailTableData = productDetails.map((data, i) => ({
        key: i,
        details: data.productDetail,
        uid: data.uid
    }));

    return (
        <>
            <h1 style={{ margin: "30px 0px" }}>Add Product Details</h1>
            <Row style={{ margin: "30px 0px" }}>

                <Col
                    md={{ span: 18, offset: 2 }}
                    xs={24}
                >                    
                        <Input
                            ref={detailInputRef}
                            onChange={() => {
                                detailInputRef.current.input.style.border = "1px solid #d9d9d9";
                            }}
                        />
                </Col>
                <Col
                    md={4}
                    xs={24}
                >
                    <Button
                        type="primary"
                        onClick={handleAddDetail}
                    >Add Detail</Button>
                </Col>
            </Row>
            <Table
                columns={productDetailColumns}
                bordered={true}
                dataSource={productDetailTableData}
            />
        </>
    );
}

export default ProductDetailTable;
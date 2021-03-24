import { Row, Col, Image, Button } from 'antd';
import { filter } from 'async';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { OrderProductDiv } from './style.js'



const OrderProduct = ({ productId }) => {
    const [selectedProduct, setSelectedProduct] = useState();
    const current_user_id = useSelector(state => state?.user?.user?.user_id)
    const allProducts = useSelector(state => state.allProducts?.allProducts);
    useEffect(() => {
        const filteredProduct = allProducts?.filter(item => item.product_id == productId);

        setSelectedProduct(filteredProduct[0]);
        
    }, [productId]);
    return (
        <OrderProductDiv>
            <Row
                style={{
                    alignItems: "baseline"
                }}
            >
                <Col
                    md={{
                        span: 8,
                        offset:3
                    }}
                >
                    {
                        selectedProduct ?
                            <Image
                                width={100}
                                alt={selectedProduct?.product_name}
                                src={require(`../../../assests/images/product_images/${selectedProduct?.product_images ? selectedProduct?.product_images[0]["image"] : ""}`).default || ""}
                            />
                            :
                            ""
                    }

                </Col>
                <Col
                    md={{ span: 8 }}
                >
                    <h1 id="product_name">{selectedProduct?.product_name}</h1>
                    <h4>Price: ${selectedProduct?.product_price}</h4>

                </Col>
                <Col
                    md={{
                        span: 3,
                        offset: 1
                    }}
                >
                    <Button type="primary">Buy</Button>
                </Col>
            </Row>
        </OrderProductDiv>
    )
}

export default OrderProduct;
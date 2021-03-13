import React from 'react';
import {Row, Col} from 'antd';
import {SellDiv, BuyDiv} from '../style';

const BuySellInformation=({animatedbackgroundColor})=>{
    return (
        <Row gutter={24} style={{ textAlign: "center" }}>
            <Col 
                md={11}
            >
                <BuyDiv className="landingBuySellDiv" animatedbackgroundColor={animatedbackgroundColor}>
                    <h2>Buy Products</h2>
                </BuyDiv>
            </Col>
            <Col 
                md={11}
                offset={2}
            >
                <SellDiv animatedbackgroundColor={animatedbackgroundColor}>
                    <h2>Sell Products</h2>
                </SellDiv>
            </Col>
        </Row>
    )
}
export default BuySellInformation;
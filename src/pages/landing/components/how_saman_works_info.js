import React from 'react';
import { Row, Col, Image } from 'antd';
import styled from 'styled-components';
import { Fragment } from 'react';
import { HowSamanWorksMainDiv } from '../style';
import  WhySamanBuyImage from '../../../assests/images/why_saman_buy.png';

const HowSamanWorksDiv = () => {
    return (
        <HowSamanWorksMainDiv>
            <Row justify="center">
                <Col>
                    <h2 className="how-it-works-title">Why Saman.com?</h2>
                </Col>
            </Row>
            <Row justify="center">
                <Col
                    // md={7}
                    // lg={7}
                    // xs={24}
                    style={{
                        textAlign: "center"
                    }}
                >
                    <h1 className="how-it-works-info">Saman.com Provides a New Way<br />To Make Trades Faster Anywhere, Anytime.</h1>
                </Col>

            </Row>
            <Row justify="center" style={{
                textAlign:'center'
            }}>
                <Col
                    md={4}
                    offset={2}
                >
                    <div>
                    <Image
                        src={WhySamanBuyImage}
                    />                    
                    </div>
                    <div>
                        <p className="how-it-works-info-headers">Buy from your closest seller.</p>
                    </div>
                    <div>
                        <p className="how-it-works-info-contents">Saman recommends you products from the sellers that are nearest to you for your faster delivery .</p>
                    </div>
                </Col>
                <Col
                 md={4}
                 offset={2}
                >
                    <Image
                        src={WhySamanBuyImage}
                    >

                    </Image>
                </Col>
                <Col
                    md={4}
                    offset={2}
                >
                    <Image
                        src={WhySamanBuyImage}
                    >

                    </Image>
                </Col>
                
            </Row>
        </HowSamanWorksMainDiv>
    )
}

export default HowSamanWorksDiv;
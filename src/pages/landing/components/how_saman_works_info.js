import React from 'react';
import { Row, Col, Image } from 'antd';
import styled from 'styled-components';
import { Fragment } from 'react';
import { HowSamanWorksMainDiv } from '../style';
import WhySamanBuyImage from '../../../assests/images/why_saman_buy.png';
import WhySamanSellImage from '../../../assests/images/why_saman_sell.png';

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
                textAlign: 'center',
                alignItems: "baseline"
            }}

            >
                <Col
                    md={4}

                >
                    <div>
                        <Image
                            src={WhySamanBuyImage}
                            preview={false}
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
                    <div>
                        <Image
                            src={WhySamanSellImage}
                            width={100}
                            preview={false}
                        />

                    </div>
                    <div>
                        <p className="how-it-works-info-headers">Sell any product for free.</p>
                    </div>
                    <div>
                        <p className="how-it-works-info-contents">Saman allows its users to sell any type of products from anywhere for free in just few clicks.</p>
                    </div>

                </Col>
                <Col
                    md={4}
                    offset={2}
                >
                    <div>
                        <Image
                            src={WhySamanBuyImage}
                            preview={false}
                        />
                    </div>
                    <div>

                        <p className="how-it-works-info-headers">Talk with your seller.</p>
                    </div>
                    <div>
                        <p className="how-it-works-info-contents">Saman provides features that allows the users to talk to the sellers about the product details.</p>
                    </div>

                </Col>

            </Row>
        </HowSamanWorksMainDiv>
    )
}

export default HowSamanWorksDiv;
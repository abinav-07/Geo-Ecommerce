import React from 'react';
import { Row, Col, Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { WelcomeDiv, PCBackgroundImg, RightBackGround, LandingRightColumn } from './style';
import pcBackgroundImg from '../../assests/images/pcBackgroundImg.jpg'

const LandingPage = () => {
    return (
        <>
            <Layout>
                <Content>
                    <Row gutter={24} style={{ textAlign: "center" }}>
                        <Col md={{ span: 6, offset: 3 }}>
                            <WelcomeDiv>
                                <div>
                                    Welcome To
                                </div>
                                <div>
                                    Saman.com
                                </div>
                                <div className="welcome-div-text">
                                  A place where you can buy new and old products and we also give you free online selling platform.   
                                </div>
                            </WelcomeDiv>

                        </Col>
                        <Col md={{ span: 11, offset: 1 }}>
                            <LandingRightColumn>
                                <RightBackGround>
                                </RightBackGround>
                                <PCBackgroundImg
                                    src={pcBackgroundImg}
                                >
                                </PCBackgroundImg>

                            </LandingRightColumn>

                        </Col>
                    </Row>
                </Content>
            </Layout>

        </>
    )
}

export default LandingPage;
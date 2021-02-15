import React, { useEffect, useRef } from 'react';
import { Row, Col, Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { WelcomeDiv, PCBackgroundImg, RightBackGround, LandingRightColumn } from './style';
import pcBackgroundImg from '../../assests/images/pcBackgroundImg.jpg';
import $ from 'jquery';
import { DownCircleFilled } from '@ant-design/icons';

import HowSamanWorksDiv from './components/how_saman_works_info';
import BuySellInformation from './components/buy_sell_info';

const LandingPage = () => {

    //Animation Div Ref
    const landingRightColumnElement = useRef(null);
    const totalDegreesToRotateLandingRightDiv = 20;
    const totalDegreesToRotateLandingBuySellDiv = 40;

    useEffect(() => {
        const handleScroll = (event) => {
            let innerHeightValue = $("#landingRightColumnDiv").innerHeight() / 2;
            const landingRightDivDegreesToRotate = calculateRotation(innerHeightValue, totalDegreesToRotateLandingRightDiv);
            const landingBuySellDivDegreesToRotate = calculateRotation(innerHeightValue, totalDegreesToRotateLandingBuySellDiv);

            if (landingRightDivDegreesToRotate <= totalDegreesToRotateLandingRightDiv && landingRightDivDegreesToRotate >= 0) {

                $("#landingRightColumnDiv").css({
                    "transform": `rotate(${totalDegreesToRotateLandingRightDiv - landingRightDivDegreesToRotate}deg)`
                });


            } else {
                $("#landingRightColumnDiv").css({
                    "transform": `rotate(0deg)`
                });

            }

            if (landingBuySellDivDegreesToRotate < totalDegreesToRotateLandingBuySellDiv ) {
                $(".landingBuySellDiv").css({
                    "transform": `rotate(${totalDegreesToRotateLandingBuySellDiv - landingBuySellDivDegreesToRotate}deg)`
                });

            } else {
                $(".landingBuySellDiv").css({
                    "transform": `rotate(0deg)`
                });
            }

            //Animation
            // console.log(getRotationDegree($("#landingRightColumnDiv")));

        }

        window.addEventListener("scroll", handleScroll);
        // window.addEventListener("DOMContentLoaded", handleScroll);
    }, []);

    const calculateRotation = (innerHeightValue, totalDegreesToRotate) => {
        // let innerHightValue = document.documentElement.offsetHeight/2;
        // let innerHightValue = $("#landingRightColumnDiv")[0].scrollHeight/2;
        let oneDegreePixelValue = innerHeightValue / totalDegreesToRotate;
        let onePixelDegree = 1 / oneDegreePixelValue;
        // console.log(onePixelDegree);
        let degreesToRotate = totalDegreesToRotate;
        let marginToDecrease = window.scrollY * onePixelDegree;
        // console.log("scrollY", window.scrollY);
        // console.log("scroll Height", $("#landingRightColumnDiv")[0].scrollHeight);
        // console.log("scrollY", window.scrollY);
        // console.log(document.documentElement.offsetHeight);

        $("#landingRightBackgroundDiv").css({
            "right": `-${marginToDecrease * 1.2}%`
        })
        // console.log("inner Height", $("#landingRightColumnDiv").innerHeight());

        degreesToRotate = window.scrollY * onePixelDegree;



        return degreesToRotate;

    }

    const getRotationDegree = (elementObj) => {
        var matrix = elementObj.css("-webkit-transform") ||
            elementObj.css("-moz-transform") ||
            elementObj.css("-ms-transform") ||
            elementObj.css("-o-transform") ||
            elementObj.css("transform");
        if (matrix !== 'none') {
            var values = matrix.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        } else { var angle = 0; }

        if (angle < 0) angle += 360;
        return angle;
    }

    return (
        <>
            <Layout style={{
                backgroundColor: "white"
            }}
            >
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
                            <LandingRightColumn ref={landingRightColumnElement} id="landingRightColumnDiv">
                                <RightBackGround id="landingRightBackgroundDiv">
                                </RightBackGround>
                                <PCBackgroundImg
                                    src={pcBackgroundImg}
                                >
                                </PCBackgroundImg>

                            </LandingRightColumn>

                        </Col>
                    </Row>                    
                    <BuySellInformation />
                    <HowSamanWorksDiv />
                </Content>
            </Layout>

        </>
    )
}

export default LandingPage;
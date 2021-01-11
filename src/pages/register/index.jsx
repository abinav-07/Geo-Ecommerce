import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import Layout, { Header, Content, Footer } from 'antd/lib/layout/layout';
import { Row, Col, Form, Input, Divider, Image, Button } from 'antd';
import { LeftOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { CustomizedButton, CustomGoogleLoginBtn } from '../../components/login_sign_up_components';
import { google_client_id } from '../../config';
import logo from '../../assests/images/logo.png'

//Google Sign Up Response
const responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
}



const RegisterUser = () => {
    const history=useHistory();
    return (
        <>
            <Layout style={{ height: "100vh" }}>
                <Header style={{ background: "#fff" }}>
                    <Row>
                        <Col xs={{ span: 2 }} md={{ span: 8 }}>
                            <CustomizedButton onClick={()=>history.goBack()}><LeftOutlined />Back</CustomizedButton>
                        </Col>
                        <Col xs={{ span: 4, offset: 6 }} md={{ span: 8, offset: 8 }} style={{ textAlign: "end" }}>
                            <CustomizedButton><Link to="/users/login">Already have an account? Log In</Link></CustomizedButton>
                        </Col>
                    </Row>
                </Header>
                <Content>
                    <Row justify="center" align="middle" className="main-content" style={{ flexDirection: "column", minHeight: "90%" }}>
                        <Row>
                            <Image
                                width={100}
                                src={logo}
                            >
                            </Image>
                        </Row>
                        <Row>
                            <h2>Sign Up</h2>
                        </Row>
                        <Row gutter={24} style={{width:"100%", paddingTop: "1rem",display: "flex",justifyContent: "center",alignItems: "center"}} >
                            <Col md={{ span: 8 }} >
                                <Form
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                >
                                    <Form.Item
                                        label="First Name"
                                        name="firstName"
                                        rules={[{ required: true, message: "Please Enter Your First Name!" }]}
                                    >
                                        <Input></Input>
                                    </Form.Item>
                                    <Form.Item
                                        label="Last Name"
                                        name="lastName"
                                        rules={[{ required: true, message: "Please Enter Your Last Name!" }]}
                                    >
                                        <Input></Input>
                                    </Form.Item>
                                    <Form.Item
                                        label="Email"
                                        name="registerEmail"
                                        rules={[{ required: true, message: "Please Enter Email!" }]}
                                    >
                                        <Input></Input>
                                    </Form.Item>
                                    <Form.Item
                                        label="Password"
                                        name="registerPassword"
                                        rules={[{ required: true, message: "Please Enter Password!" }]}
                                    >
                                        <Input.Password
                                            iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                                        >
                                        </Input.Password>
                                    </Form.Item>
                                    <Form.Item
                                        label="Confirm Password"
                                        name="registerConfirmPassword"
                                        rules={[{ required: true, message: "Please Enter Password!" }]}
                                    >
                                        <Input.Password
                                            iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                                        >
                                        </Input.Password>
                                    </Form.Item>
                                    <Form.Item
                                        name="signUp"
                                        wrapperCol={{
                                            xs:{offset:0,span:16},
                                            md:{offset:8,span:16}
                                        }}
                                        style={{textAlign:"center"}}
                                    >
                                        <Button type="primary" style={{width:"50%"}}>Sign Up</Button>
                                    </Form.Item>
                                </Form>
                            </Col>
                            <Col xs={{ span: 24 }} md={{ span: 2 }} align="middle">
                                <Divider type="vertical" style={{ height: "50%" }} style={{ 'backgroundColor': "#616362" }}></Divider>
                                <span>OR</span>
                            </Col>
                            <Col md={{ span: 8 }}>
                                <CustomGoogleLoginBtn
                                    clientId={google_client_id}
                                    buttonText="Sign Up With Google"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </Col>
                        </Row>

                    </Row>
                </Content>
                <Footer>

                </Footer>
            </Layout>
        </>
    )
}

export default RegisterUser;
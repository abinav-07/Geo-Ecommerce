import React from 'react';
import {Link,useHistory} from 'react-router-dom';
import { Layout, Row, Col, Form, Input, Checkbox, Button, Divider, Image } from 'antd';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import { CustomizedButton, CustomGoogleLoginBtn } from '../../components/login_sign_up_components';
import { LeftOutlined } from '@ant-design/icons';
import logo from '../../assests/images/logo.png'
import { google_client_id } from '../../config';

//Google Sign Up Response
const responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
}


const LoginPage = () => {
    const history=useHistory();
    return (
        <>
            <Layout style={{ height: "100vh" }}>
                <Header style={{ background: "#fff" }}>
                    <Row>
                        <Col span={8}>
                            <CustomizedButton onClick={()=>history.goBack()}><LeftOutlined />Back</CustomizedButton>
                        </Col>
                        <Col span={8} offset={8} style={{ textAlign: "end" }}>
                            <CustomizedButton><Link to="/users/register">CREATE ACCOUNT</Link></CustomizedButton>
                        </Col>
                    </Row>
                </Header>
                <Content >
                    <Row justify="center" align="middle" className="main-content" style={{ flexDirection: "column", minHeight: "90vh" }}>
                        <Row>
                            <Image
                                width={100}
                                src={logo}
                            >
                            </Image>
                        </Row>
                        <Row>
                            <h2>Log into Saman.com</h2>
                        </Row>

                        <Row style={{ width: "100vw", paddingTop: "1rem" }}>
                            <Col md={{ span: 8 }} offset={3}>
                                <Form
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                    name="loginForm"
                                >
                                    <Form.Item
                                        label="Email"
                                        name="loginEmail"
                                        rules={[{ required: true, message: "Please Enter Email!" }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Password"
                                        name="loginPassword"
                                        rules={[{ required: true, message: "Please Enter Password!" }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        style={{ textAlign: "center" }}
                                        wrapperCol={{
                                            xs: { offset: 0, span: 16 },
                                            md: { offset: 8, span: 16 },
                                        }}
                                        name="logIn"
                                    >
                                        <Button
                                            type="primary"
                                            style={{ width: "50%" }}
                                        >Log In</Button>
                                    </Form.Item>
                                    <Form.Item
                                        style={{ textAlign: "center" }}
                                        wrapperCol={{
                                            xs: { offset: 0, span: 16 },
                                            md: { offset: 8, span: 16 },
                                        }}
                                        name="rememberMe"
                                    >
                                        <Checkbox>Remember Me</Checkbox>
                                    </Form.Item>

                                </Form>
                            </Col>
                            <Col xs={{ span: 24 }} md={{ span: 2 }} style={{ textAlign: "center", padding: "2.3rem 0" }}>
                                <Divider type="vertical" style={{ height: "50%" }} style={{'backgroundColor':"#616362"}}></Divider>
                                <span>OR</span>
                            </Col>
                            <Col xs={{
                                span: 24
                            }}
                                md={{
                                    span: 8
                                }}
                                 style={{ padding: "1.4rem 0",  }}
                                >
                                <CustomGoogleLoginBtn
                                    clientId={google_client_id}
                                    buttonText="Continue With Google"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </Col>
                        </Row>

                    </Row>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    <span dangerouslySetInnerHTML={{ "__html": "&copySaman.com" }}></span>
                </Footer>
            </Layout>
        </>
    )
}
export default LoginPage;
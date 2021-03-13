import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, Redirect } from 'react-router-dom';
import Layout, { Header, Content, Footer } from 'antd/lib/layout/layout';
import { Row, Col, Form, Input, Divider, Image, Button, Alert } from 'antd';
import { LeftOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { CustomizedButton, CustomGoogleLoginBtn, DividerColumn } from '../../components/login_sign_up_components';
import { google_client_id } from '../../config';
import logo from '../../assests/images/logo.png';
import { getToken } from '../../utils/storage';

//Actions
import { registerUser, onUserErrorReset } from '../../redux';

const RegisterUserPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const registeringUser = useSelector(state => state.user?.registeringUser);
    const registerErrorMsg = useSelector(state => state.user?.registrationError);

    //Reset Errors
    useEffect(() => {
        dispatch(onUserErrorReset());
    }, []);

    //Google Sign Up Response
    const responseGoogle = (response) => {
        const googleResponse = response.profileObj;
        const googleFormValues = {
            firstName: googleResponse.name,
            email: googleResponse.email,
            googleId: googleResponse.googleId,
            type: "googleAuth"
        }
        dispatch(registerUser(googleFormValues, history));
    }

    const responseGoogleFailure = (response) => {
        console.log('Failed: ', response);
    }

    const onFinish = (values) => {
        const formValues = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.registerEmail,
            password: values.registerPassword,
            confirm_password: values.registerConfirmPassword,
        }
        dispatch(registerUser(formValues, history));
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed: ', errorInfo);
    };

    //Redirect to Landing if already Logged In    
    useEffect(() => {
        if (getToken()) {
            history.push("/");
        }
    });

    return (
        <>
            <Layout>
                <Header style={{ background: "#fff" }}>
                    <Row>
                        <Col xs={{ span: 2 }} md={{ span: 8 }}>
                            <CustomizedButton onClick={() => history.push("/")}><LeftOutlined />Back</CustomizedButton>
                        </Col>
                        <Col xs={{ span: 4, offset: 6 }} md={{ span: 8, offset: 8 }} style={{ textAlign: "end" }}>
                            <CustomizedButton><Link to="/users/login">Already have an account? Log In</Link></CustomizedButton>
                        </Col>
                    </Row>
                </Header>
                <Content>
                    <Row justify="center" align="middle" className="main-content" style={{ flexDirection: "column", minHeight: "90vh" }}>
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
                        {registerErrorMsg && (
                            <Alert
                                message={registerErrorMsg}
                                type="error"
                                closable
                            />
                        )}
                        <Row gutter={24} style={{ width: "100%", paddingTop: "1rem", display: "flex", justifyContent: "center", alignItems: "center" }} >
                            <Col md={{ span: 8 }} >
                                <Form
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
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
                                            xs: { offset: 0, span: 16 },
                                            md: { offset: 8, span: 16 }
                                        }}
                                        style={{ textAlign: "center" }}
                                    >
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            style={{ width: "50%" }}
                                            loading={registeringUser}
                                        >Sign Up
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Col>
                            <DividerColumn xs={{ span: 24 }} md={{ span: 2 }} style={{ textAlign: "center", }} align="middle">
                                <Divider type="vertical" style={{ 'backgroundColor': "#616362" }}></Divider>
                                <span>OR</span>
                            </DividerColumn>
                            <Col xs={{
                                span: 24
                            }} md={{ span: 8 }}>
                                <CustomGoogleLoginBtn
                                    clientId={google_client_id}
                                    buttonText="Sign Up With Google"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogleFailure}
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

export default RegisterUserPage;
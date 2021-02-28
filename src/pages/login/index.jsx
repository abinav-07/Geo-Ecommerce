import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, withRouter, useHistory } from 'react-router-dom';
import { Layout, Row, Col, Form, Input, Checkbox, Button, Divider, Image, Alert } from 'antd';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import { CustomizedButton, CustomGoogleLoginBtn } from '../../components/login_sign_up_components';
import { LeftOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import logo from '../../assests/images/logo.png'
import { google_client_id } from '../../config';
import { getToken } from '../../utils/storage';
// import history  from '../../utils/history';

//User Actions
import { loginUser, onUserErrorReset } from '../../redux';

const LoginUserPage = () => {

    const history = useHistory();

    const dispatch = useDispatch();
    const loggingUser = useSelector(state => state.user?.loggingIn);
    const userDetail = useSelector(state => state.user?.user);
    const loggingErrorMsg = useSelector(state => state.user?.loggingError);

    //Reset Errors
    useEffect(()=>{
        dispatch(onUserErrorReset());
    },[]);

    //Google Sign Up Response
    const responseGoogle = (response) => {
        const googleResponse = response.profileObj;
        const googleFormValues = {
            firstName: googleResponse.name,
            email: googleResponse.email,
            googleId: googleResponse.googleId,
            type: "googleAuth"
        }
        dispatch(loginUser(googleFormValues, history));
    }

    const responseGoogleFailure = (response) => {
        console.log('Failed: ', response);
    }

    const onFinish = (values) => {
        dispatch(loginUser(values, history));
    }

    //Redirect to Landing if already Logged In    
    useEffect(() => {
        if (getToken()) {
            history.push("/");
        }
    }, [userDetail]);


    return (
        <>
            <Layout >
                <Header style={{ background: "#fff" }}>
                    <Row>
                        <Col span={8}>
                            <CustomizedButton onClick={() => history.push("/")}><LeftOutlined />Back</CustomizedButton>
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
                        {loggingErrorMsg && (
                            <Alert
                                type="error"
                                message={loggingErrorMsg}
                                closable
                            />
                        )}
                        <Row style={{ width: "100vw", paddingTop: "1rem" }}>
                            <Col md={{ span: 8 }} offset={3}>
                                <Form
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                    name="loginForm"
                                    onFinish={onFinish}
                                >
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[{ required: true, message: "Please Enter Email!" }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[{ required: true, message: "Please Enter Password!" }]}
                                    >
                                        <Input.Password
                                            iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                                        >
                                        </Input.Password>
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
                                            htmlType="submit"
                                            style={{ width: "50%" }}
                                            loading={loggingUser}
                                        >Log In</Button>
                                    </Form.Item>
                                    <Form.Item
                                        style={{ textAlign: "center" }}
                                        wrapperCol={{
                                            xs: { offset: 0, span: 16 },
                                            md: { offset: 8, span: 16 },
                                        }}
                                        valuePropName="checked"
                                        name="rememberMe"
                                    >
                                        <Checkbox>Remember Me</Checkbox>
                                    </Form.Item>

                                </Form>
                            </Col>
                            <Col xs={{ span: 24 }} md={{ span: 2 }} style={{ textAlign: "center", padding: "2.3rem 0" }}>
                                <Divider type="vertical" style={{ height: "50%", 'backgroundColor': "#616362" }}></Divider>
                                <span>OR</span>
                            </Col>
                            <Col xs={{
                                span: 24
                            }}
                                md={{
                                    span: 8
                                }}
                                style={{ padding: "1.4rem 0", }}
                            >
                                <CustomGoogleLoginBtn
                                    clientId={google_client_id}
                                    buttonText="Continue With Google"
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
export default LoginUserPage;
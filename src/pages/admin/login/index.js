import React, { useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Layout, Row, Col, Form, Input, Checkbox, Button, Divider, Image, Alert } from 'antd';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import { CustomizedButton} from '../../../components/login_sign_up_components';
import { LeftOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import logo from '../../../assests/images/logo.png'
import { getAdminToken } from '../../../utils/storage';

// import history  from '../../utils/history';


const LoginAdminPage = () => {

    const history = useHistory();
    const [loggingErrorMsg, setLogginErrorMsg]=useState(null);

    
    
    const onFinish = (values) => {
        let {username,password}=values;
        if(username==="admin" && password==="admin"){
            sessionStorage.setItem("admin",username);
            history.push("/admin/customers");
        }else{
            setLogginErrorMsg("Incorrect Password!");
        }
    }

    // Redirect to Landing if already Logged In    
    useEffect(() => {
        if (getAdminToken()) {
            history.push("/admin/customers");
        }
    });


    return (
        <>
            <Layout >
                <Header style={{ background: "#fff" }}>
                    <Row>
                        <Col span={8}>
                            <CustomizedButton onClick={() => history.push("/")}><LeftOutlined />Back</CustomizedButton>
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
                            <h2>Log into Admin Panel</h2>
                        </Row>
                        {loggingErrorMsg && (
                            <Alert
                                type="error"
                                message={loggingErrorMsg}
                                closable
                            />
                        )}
                        <Row justify="center" style={{ width: "100vw", paddingTop: "1rem" }}>
                            <Col md={{span:8}}>
                                <Form
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 10 }}
                                    name="loginForm"
                                    onFinish={onFinish}
                                >
                                    <Form.Item
                                        label="Username"
                                        name="username"
                                        rules={[{ required: true, message: "Please Enter Username!" }]}
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
                                        style={{ textAlign: "center", justifyContent:"center" }}
                                        // wrapperCol={{
                                        //     xs: { offset: 0, span: 16 },
                                        //     md: { offset: 2, span: 16 },
                                        // }}
                                        name="logIn"
                                    >
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            style={{ width: "50%" }}                                            
                                        >Log In</Button>
                                    </Form.Item>                                    
                                </Form>
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
export default LoginAdminPage;
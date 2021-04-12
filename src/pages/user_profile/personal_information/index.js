import { Button, Form, Input, notification } from "antd";
import { PageLayout, MainDiv } from "../style";
import { useSelector, useDispatch } from 'react-redux';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import axios from "axios";
import { API_URL } from "../../../config";
import { getUserData } from '../../../redux';

const UserPersonalInformationTab = () => {
    const dispatch = useDispatch();
    const User = useSelector(state => state.user?.user);
    const initialFormValues = {
        "email": User?.email,
        "firstName": User?.first_name,
        "lastName": User?.last_name,
    }

    const onPersonalInfoFormFinish = (values) => {
        values["user_id"] = User?.user_id;
        axios.post(`${API_URL}/users/update-profile`, values)
            .then(res => {
                notification.success({
                    message: res.data,
                    duration: 5
                });
                dispatch(getUserData());
            })
            .catch(err => {
                notification.error({
                    message: err.response.data?.details[0]["message"],
                    duration: 5
                });
            })
    }

    const onPersonalInfoFormFinishFailed = (errorInfo) => {
        console.log("Info Failed", errorInfo);
    }

    const onUpdatePassword = (values) => {
        values["user_id"] = User?.user_id;
        axios.post(`${API_URL}/users/update-password`, values)
            .then(res => {
                notification.info({
                    message: res.data,
                    duration: 5
                });
                dispatch(getUserData());
            })
            .catch(err => {
                notification.error({
                    message: err.response.data?.details?.[0]["message"] || err.response.data["message"],
                    duration: 5
                })
            })
    }

    const onUpdatePasswordFailed = (errorInfo) => {
        console.log("Password Failed", errorInfo);
    }

    return (
        <PageLayout>
            <MainDiv>
                <Form
                    labelCol={{ md: { span: 8 }, xs: { span: 24 } }}
                    wrapperCol={{ md: { span: 8 }, xs: { span: 24 } }}
                    name="userForm"
                    initialValues={initialFormValues}
                    style={{
                        marginTop: "10px"
                    }}
                    onFinish={onPersonalInfoFormFinish}
                    onFinishFailed={onPersonalInfoFormFinishFailed}
                >
                    <div className="form-labels">
                        <span >Personal Information</span>
                    </div>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Your Total Expenditure" name="totalExpenditure">
                        <span className="form-span-values"><b>${User?.total_expenditure || 0}</b></span>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            xs: { offset: 0, span: 16 },
                            md: { offset: 8, span: 16 },
                        }}
                    >
                        <Button type="primary" htmlType="submit">Update Profile</Button>
                    </Form.Item>
                </Form>
                <Form
                    labelCol={{ md: { span: 8 }, xs: { span: 24 } }}
                    wrapperCol={{ md: { span: 8 }, xs: { span: 24 } }}
                    name="passwordManagementForm"
                    onFinish={onUpdatePassword}
                    onFinishFailed={onUpdatePasswordFailed}
                >
                    <div className="form-labels">
                        <span>Password Management</span>
                    </div>
                    <Form.Item
                        label="Old Password"
                        name="oldPassword"
                        rules={[{ required: true }]}
                    >
                        <Input.Password
                            iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="New Password"
                        name="newPassword"
                        rules={[{ required: true }]}
                    >
                        <Input.Password
                            iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            xs: { offset: 0, span: 16 },
                            md: { offset: 8, span: 16 },
                        }}
                    >
                        <Button type="primary" htmlType="submit">Update Password</Button>
                    </Form.Item>
                </Form>
            </MainDiv>
        </PageLayout>
    )
}

export default UserPersonalInformationTab;
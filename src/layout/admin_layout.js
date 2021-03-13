import { useState } from "react";
import { Layout } from "antd";
import styled from 'styled-components';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
import AdminNavBar from '../components/admin_nav_bar';


const { Content, Sider, Header } = Layout;

const AdminContent = styled(Content)`
    min-height:100vh;
    width:100%;
    padding-left:1.5rem;
    padding-right:1.5rem;   
    padding-top:2rem;
`

const AdminLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSider = () => {
        setCollapsed(!collapsed);
    }

    return (
        <Layout
            style={{
                backgroundColor: "#fff"
            }}
        >
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Header
                    style={{
                        paddingRight: "20px",
                        textAlign: "right"
                    }}
                >
                    {collapsed ?
                        <MenuUnfoldOutlined style={{ color: "white", fontSize: "1.3rem" }} onClick={() => { toggleSider() }} />
                        :
                        <MenuFoldOutlined style={{ color: "white", fontSize: "1.3rem" }} onClick={() => { toggleSider() }} />}
                </Header>
                <AdminNavBar />
            </Sider>
            <AdminContent>
                {children}
            </AdminContent>
        </Layout>
    )
};

export default AdminLayout;
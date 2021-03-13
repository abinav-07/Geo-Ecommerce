import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Link, useHistory } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import { NavBarDiv, NavBarMenu, NavBarMenuItem, LogoutButton } from './style';
import { NavbarItems } from './navbar_items';
import { removeAdminToken } from '../../utils/storage';
import { useParams } from 'react-router-dom';

const AdminNavBar = () => {
    const history = useHistory();


    const activeKey = history.location.pathname.split("/")[2];


    const logoutAdmin = () => {
        removeAdminToken();
        history.push("/admin/login");
    }

    return (
        <NavBarDiv>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[activeKey]}>
                {NavbarItems?.map(({ name, key, label, path, icon }, i) => (
                    <NavBarMenuItem key={key} icon={icon}>
                        <Link to={path}>
                            {label}
                        </Link>
                    </ NavBarMenuItem>
                ))}
                <Menu.Item key="Logout" icon={<LogoutOutlined />}>
                    <LogoutButton
                        onClick={() => { logoutAdmin() }}
                    >
                        Log Out
                    </LogoutButton>
                </Menu.Item>
            </Menu>
        </NavBarDiv>
    )
}

export default AdminNavBar;
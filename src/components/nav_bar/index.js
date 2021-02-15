import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import SearchBar from './search_bar';
import { NavBarDiv, NavBarMenu, MenuItem, DropDownMenuDiv, UserDropDownMenuDiv, LogoutButton } from './style';
import { Row, Col, Dropdown, Divider, Image } from 'antd';
import { DownOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons'
import { NavbarItems, UserProfileItems } from './navbar_items';
import { getToken } from '../../utils/storage';
import { Fragment } from 'react';
import { logoutUser } from '../../redux';
import 'font-awesome/css/font-awesome.min.css';
import logo from '../../assests/images/logo.png';

const Navbar = ({ displaySearchBar }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const User = useSelector(state => state.user?.user);
    const fullName = `${User?.first_name} ${User?.last_name ? User?.last_name : ""}`;

    const onLogout = () => {
        dispatch(logoutUser(history));
    }

    const DropDownMenu = (props) => {
        return (
            <DropDownMenuDiv>
                {
                    (props.subMenu && props.subMenu.length > 0)
                        ? props.subMenu.map(({ name, label, path }) => {
                            return (
                                <NavBarMenu>
                                    <MenuItem
                                        key={name}
                                    >
                                        {label}
                                    </MenuItem>
                                </NavBarMenu>
                            )
                        }) :
                        ""
                }
            </DropDownMenuDiv>
        )
    }

    const UserDropDownMenu = () => {
        return (
            <UserDropDownMenuDiv>
                <Row className="userMenuLabel">
                    <h4><b>{fullName}</b></h4>
                </Row>
                <Row className="userMenuLabel userMenuEmail">
                    <p>{User?.email}</p>
                </Row>
                <Divider style={{ margin: "2px 0px" }} />
                <Row>
                    <LogoutButton
                        size="small"
                        onClick={() => {
                            onLogout()
                        }}
                    >
                        Log out
                    </LogoutButton>
                </Row>
            </UserDropDownMenuDiv>
        )
    }




    return (
        <NavBarDiv id="navBarDiv">
            <Row gutter={24}>
                <Col
                    md={{ span: 3, offset: 1 }}
                    xl={{ span: 3, offset: 1 }}
                >

                    {/* Conditional Search Bar Rendering */}

                    {displaySearchBar ?
                        (
                            <div style={{ padding: "1rem" }}>

                                <div>
                                    <SearchBar></SearchBar>
                                </div>
                                <div>
                                    Search
                        </div>

                            </div>
                        )
                        :
                        (
                            <div style={{ padding: "1rem" }}>
                                <Link to="/">
                                    <Image src={logo}
                                        width="80%"
                                        alt="Logo.png"
                                        onClick={() => {
                                            <Redirect to="/"></Redirect>
                                        }}
                                        preview={false}
                                    />
                                </Link>
                            </div>

                        )
                    }


                </Col>
                <Col
                    md={{ span: 8 }}
                    xl={{ span: 14 }}
                >
                    <Row style={{ display: "flex", flexDirection: "column", textAlign: "center" }}>
                        <Col>
                            <h2>Saman.com</h2>
                            {/* <Image
                                width={100}
                                src={logo}
                            >
                            </Image> */}
                        </Col>
                        <Col>
                            <NavBarMenu
                                mode="horizontal"
                            >
                                {NavbarItems.map(({ name, label, subMenu, path }) =>
                                    subMenu ?
                                        (
                                            <Dropdown
                                                overlay={<DropDownMenu subMenu={subMenu}></DropDownMenu>}
                                            >

                                                <a className="nav-bar-anchor">
                                                    <div>{label}<DownOutlined /></div>

                                                </a>


                                            </Dropdown>
                                        )
                                        :
                                        (
                                            <MenuItem
                                                key={name}
                                            >
                                                <h3>{label}</h3>
                                            </MenuItem>
                                        )

                                )}
                            </NavBarMenu>
                        </Col>
                    </Row>

                </Col>
                <Col
                    md={{ span: 8 }}
                    xl={{ span: 4, offset: 1 }}
                    style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", zIndex: "999", padding: "1rem", textAlign: "center" }}
                >
                    <div>
                        <div>
                            <SmileOutlined style={{ fontSize: "2.5rem" }} />
                        </div>
                        <div>
                            Rating
                        </div>
                    </div>
                    {getToken() ?
                        (
                            UserProfileItems.map(({ name, label }) => {
                                return (
                                    <Fragment>
                                        <Dropdown
                                            overlay={<UserDropDownMenu />}
                                            trigger={['click']}
                                            style={{
                                                pointer: "cursor"
                                            }}
                                        >
                                            <div>
                                                <div>
                                                    <UserOutlined style={{
                                                        fontSize: "2.5rem",
                                                    }} />
                                                </div>
                                                <a className="nav-bar-anchor" style={{ color: "black" }}>Profile</a>
                                            </div>

                                        </Dropdown>

                                    </Fragment>
                                )
                            })
                        )
                        :
                        (
                            <div>
                                <Link to="/users/register" className="nav-bar-anchor" style={{ color: "black" }}>
                                    <div>
                                        <i className="fa fa-hand-paper-o" style={{ fontSize: "2.5rem" }}></i>
                                    </div>
                                    <div>
                                        Sign Up/Register
                            </div>
                                </Link>

                            </div>
                        )

                    }


                </Col>
            </Row>


        </NavBarDiv>
    )
}

export default Navbar;
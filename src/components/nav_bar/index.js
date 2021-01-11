import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './search_bar';
import { NavBarMenu, MenuItem, DropDownMenuDiv } from './style';
import { Row, Col, Dropdown } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons'
import NavbarItems from './navbar_items';
import 'font-awesome/css/font-awesome.min.css';

const Navbar = () => {

    const DropDownMenu = (props) => {
        console.log(props);
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




    return (
        <div style={{ zIndex: "999", position: "relative" }}>
            <Row gutter={24}>
                <Col
                    md={{ span: 3, offset: 1 }}
                    xl={{ span: 3, offset: 1 }}
                >
                    <div style={{ padding: "1rem" }}>
                        <div>
                            <SearchBar></SearchBar>
                        </div>
                        <div>
                            Search
                        </div>

                    </div>

                </Col>
                <Col
                    md={{ span: 8 }}
                    xl={{ span: 14 }}
                >
                    <Row style={{ display: "flex", flexDirection: "column", textAlign: "center" }}>
                        <Col>
                            <h2>Saman.com</h2>
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
                    style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
                >
                    <div style={{ padding: "1rem" }}>
                        <div>
                            <SmileOutlined style={{ fontSize: "2.5rem" }} />
                        </div>
                        <div>
                            Rating
                        </div>
                    </div>
                    <div style={{ padding: "1rem", textAlign: "center" }}>
                        <Link to="/users/register" className="nav-bar-anchor" style={{ color: "black" }}>
                            <div>
                                <i className="fa fa-hand-paper-o" style={{ fontSize: "2.5rem" }}></i>
                            </div>
                            <div>
                                Sign Up/Register
                            </div>
                        </Link>

                    </div>

                </Col>
            </Row>


        </div>
    )
}

export default Navbar;
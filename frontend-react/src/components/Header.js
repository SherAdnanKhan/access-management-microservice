import React from 'react'
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userAction';
import logoNew from '../images/ibex-dashboard.png';

const Header = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const logoutHandler = (e) => {
        e.preventDefault();
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg="black" variant='dark' expand="lg" style={{ backgroundColor: "black", height: "0px" }} collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand><img src={logoNew} width={180} height="22.2" alt='logo' /></Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to='/login'>
                                {userInfo ?
                                    <NavDropdown title={`Welcome, ${userInfo.name}`} id='username'>
                                        <LinkContainer to='/logs'>
                                            <NavDropdown.Item>Application Logs</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </NavDropdown> : <Nav.Link > <i className='fas fa-user'> </i> Sign In</Nav.Link>
                                }
                            </LinkContainer>
                            {userInfo && userInfo.isAdmin &&
                                <NavDropdown title='Admin' id='adminmenu'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
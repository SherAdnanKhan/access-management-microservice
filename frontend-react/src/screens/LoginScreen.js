import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Form, Button } from "react-bootstrap";
import { login } from "../actions/userAction";
import Loader from '../components/Loader';
import FormContainer from "../components/FormContainer";
import logoNew from '../images/ibex-dashboard.png';
import ieIcon from '../images/ie-icon.png';
import chromeIcon from '../images/chrome-icon.png';
import ffIcon from '../images/ff-icon.png';
import './LoginScreen.css';
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const LoginScreen = () => {
    //React hooks
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Custom state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // redirect
    const redirect = location.search ? location.search.split('=')[1] : '/';

    // Custom use selector to get state from store
    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    //  Dispatch Call to Login
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <div className="loginBgCon my-5">
                <div className="loginBox">
                    <div className="logoBox">
                        <LinkContainer to='/login' style={{ cursor: 'pointer' }}>
                            <img width={180} height="22.2" src={logoNew} className="logo" alt="Logo" />
                        </LinkContainer>
                    </div>
                    <div className="loginContent">
                        <p>Sign In | Dashboards</p>
                        {loading && <Loader />}
                        {error && <Message variant='danger'>{error}</Message>}
                        <Form onSubmit={submitHandler}>
                            <table width="100" cellSpacing={0} cellPadding={0} border={0}>
                                <tbody>
                                    <tr>
                                        <td>
                                            <Form.Group controlId="email" className="form-group field-loginform-username required">
                                                <Form.Label className="control-label">Email Address</Form.Label>
                                                <Form.Control className="user" type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)}
                                                />
                                                <div className="help-block" />
                                            </Form.Group>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Form.Group controlId="password" required className="form-group field-loginform-password required">
                                                <Form.Label className="control-label">Password</Form.Label>
                                                <Form.Control className="pass" type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)}
                                                />
                                            </Form.Group>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <Button type="submit" className="login-btn" value="Login">
                                Submit
                            </Button>
                        </Form>
                    </div>
                    <div className="AlertBox visible-lg">
                        <div className="leftContainer">
                            <div className="rightContainer">
                                <div className="alertBox">
                                    <div>For optimal performance, we recommend these browsers:</div>
                                    <ul className="browserIcon">
                                        <li><img src={ieIcon} alt="Internet Explorer" />Internet
                                            Explorer 11</li>
                                        <li><img src={chromeIcon} alt="Google Chrome" />Chrome
                                            39.x</li>
                                        <li><img src={ffIcon} alt="FireFox" />Firefox
                                            32.x,34.x</li>
                                    </ul>
                                    <p>Users might experience unexpected results when using other
                                        browsers.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FormContainer>
    )
}
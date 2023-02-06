import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Row, Col, Form, Button } from "react-bootstrap";
import { getMe, updatedetails } from "../actions/userAction";
import Loader from '../components/Loader';
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { useNavigate } from "react-router-dom";

export const ProfileScreen = () => {
    //React hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Custom state
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState(null);

    // Custom use selector to get state from store
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const userUpdate = useSelector(state => state.userUpdate);
    const { success, error: updateError } = userUpdate;
    
    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            if (!user || !user.name) {
                dispatch(getMe('me'))
            }
            else {
                setMessage('');
                setName(user.name);
                setEmail(user.email);
            }
        }
        
    }, [dispatch, navigate, user, userInfo]);

    useEffect(() => {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
 
    //  Dispatch Call to profile update
    const submitHandler = (e) => {
        e.preventDefault();
        setMessage('');
        if (password || currentPassword) {
            if (!currentPassword) {
                setMessage('Please enter current password!')
            }
            else if (!password) {
                setMessage('Please enter new password!')
            }
            else if (!confirmPassword) {
                setMessage('Please enter confirm password!')
            }
            else if (password && password.length < 6) {
                setMessage('New password must be greater than 5 characters!')
            }
            else {
                if (currentPassword === password) {
                    setMessage('Current password and new password must be different!')
                }
                else if (password !== confirmPassword) {
                    setMessage('Confirm password not match!')
                }
                else {
                    setMessage(null);
                    dispatch(updatedetails({ id: user.id, name, email, password, currentPassword }))
                }
            }
        }
        else {
            dispatch(updatedetails({ id: user.id, name, email }))
        }
    }

    return (
        <Row className="my-5">
            <Col md={8}>
                <h1>User Profile</h1>
                {loading && <Loader />}
                {error && <Message variant='danger'>{error}</Message>}
                {updateError && <Message variant='danger'>{updateError}</Message>}
                {message && <Message variant='danger'>{message}</Message>}
                {success && <Message variant='success'>User Details Updated</Message>}
  
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label >Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="currentPassword">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Current Password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Old Password" value={password} onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button type="submit" variant='primary' className="my-3">
                        Update
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}
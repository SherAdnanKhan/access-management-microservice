import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './HomeScreen.css';
import { Radio } from 'antd';
import Message from '../components/Message';
import { IbexProfileDetails } from './IbexProfileDetails';
import { useDispatch, useSelector } from 'react-redux';
import { applicationCreateUser, getApplicationDetails, getNtLoginUser, getRoles, updateApplicationStatus } from '../actions/applcationAction';
import { useNavigate } from 'react-router-dom';
import { APPLICATIONS_RESET, APPLICATION_DETAILS_RESET, APPLICATION_STATUS_RESET, LOCATION_RESET, NTN_USER_RESET, ROLES_RESET } from '../constants/applicationConstants';
import Loader from '../components/Loader';
import Select from 'react-select';

const HomeScreen = () => {
    //React hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Custom use selector to get state from store
    const applicationDetailInfo = useSelector(state => state.applicationDetailInfo);
    const { loading: loadingApplicationDetails, success: successApplicationDetails, error: errorApplicationDetails, applicationDetails } = applicationDetailInfo;
    const ntnInfo = useSelector(state => state.ntnInfo);
    const { loading, error, ibexUser } = ntnInfo;
    const applicationsInfo = useSelector(state => state.applicationsInfo);
    const { loading: loadingApplications, error: errorApplications, applications } = applicationsInfo;
    const appUserCreateinfo = useSelector(state => state.appUserCreateinfo);
    const { loading: loadingUserCreate, error: errorUserCreate, success: successUserCreate } = appUserCreateinfo;
    const applicationStatusInfo = useSelector(state => state.applicationStatusInfo);
    const { loading: loadingApplicationStatus, error: errorApplicationStatus, success: successApplicationStatus } = applicationStatusInfo;
    const rolesInfo = useSelector(state => state.rolesInfo);
    const { loading: loadingRoles, error: errorRoles, roles } = rolesInfo;
    const locationInfo = useSelector(state => state.locationInfo);
    const { loading: loadingLocations, error: errorLocations, locations } = locationInfo;
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    // Custom state
    const [ntLogin, setNtLogin] = useState('');
    const [message, setMessage] = useState(null);
    const [application, setApplication] = useState('');
    const [role, setRole] = useState('');
    const [location, setLocation] = useState([]);
    const [applicationStatus, setApplicationStatus] = useState(applicationDetails ? applicationDetails : '');

    // This will run once used to reset application form 
    useEffect(() => {
        return () => {
            setNtLogin('');
            setApplication('');
            setRole('');
            setApplicationStatus('');
            dispatch({ type: NTN_USER_RESET });
            dispatch({ type: APPLICATIONS_RESET });
            dispatch({ type: LOCATION_RESET });
            dispatch({ type: ROLES_RESET });
            dispatch({ type: APPLICATION_DETAILS_RESET });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else if (applicationStatus !== '') {
            sendApplicationStatus();
        } else if (ibexUser) {
            dispatch({ type: ROLES_RESET });
            dispatch({ type: LOCATION_RESET });
            dispatch({ type: APPLICATION_DETAILS_RESET });
            dispatch({ type: APPLICATION_STATUS_RESET });
        }
        if (application) {
            dispatch(getRoles(application));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate, userInfo, ibexUser, application, applicationStatus]);


    //  Dispatch Call to get Ntn user 
    const submitNtLoginHandler = (e) => {
        e.preventDefault();
        setApplicationStatus('');
        setMessage('');
        if (!ntLogin) {
            setMessage('NTLogin Is Missing!')
        }
        else {
            setApplication('');
            dispatch(getNtLoginUser(ntLogin));
        }
    }

    // Application changer handler
    const onApplicationChangeHandler = (e) => {
        e.preventDefault();
        setRole('');
        setApplication(e.target.value);
    }

    // Dispatch Call to get Application status 
    const submitApplicationHandler = (e) => {
        e.preventDefault();
        setMessage('');
        if (!ibexUser) {
            setMessage('Nt user Is Missing!')
        }
        else if (!application) {
            setMessage('Application Is Missing!')
        }
        else if (roles && roles.length > 0 && !role) {
            setMessage('Role Is Missing!')
        }
        else if (locations && locations.length > 0 && location.length < 1) {
            setMessage('Location Is Missing!')
        }
        else {
            dispatch(getApplicationDetails({ ibexUser, application, role }));
        }
    }

    // Dispatch Call to create user 
    const applicationUserCreateHandler = (e) => {
        e.preventDefault();
        setMessage('');
        if (!ibexUser) {
            setMessage('Nt user Is Missing!')
        }
        else if (!application) {
            setMessage('Application Is Missing!')
        }
        else if (roles && roles.length > 0 && !role) {
            setMessage('Role Is Missing!')
        }
        else if (locations && locations.length > 0 && location.length < 1) {
            setMessage('Location Is Missing!')
        }
        else {
            const permission = role || location;
            dispatch(applicationCreateUser({ ibexUser, application, permission }));
        }
    }

    // Application status change handler
    const onApplicationStatusHandler = (e) => {
        e.preventDefault();
        setMessage('');
        if (window.confirm('Do you want to change the application status?')) {
            setApplicationStatus(e.target.value);
        }
    };

    // Dispatch Call for Application status change
    const sendApplicationStatus = () => {
        if (!ntLogin) {
            setMessage('NTLogin Is Missing!')
        }
        else if (!application) {
            setMessage('Application Is Missing!')
        }
        else if (!location && roles.length > 0 && !role) {
            setMessage('Role Is Missing!')
        }
        else if (!role && location.length > 0 && location.length < 1) {
            setMessage('Location Is Missing!')
        }
        else if (!ibexUser) {
            setMessage('Please Get Info Before Enabaling Or Disabling Application Access!')
        }
        else if (applicationStatus !== '') {
            dispatch(updateApplicationStatus({ ibexUser, application, role, applicationStatus }));
        }
    }


    return (
        <>
            <div className="emp-profile">

                {/* LOADERS BEFORE API REQUEST */}
                {loading && <Loader />}
                {loadingRoles && <Loader />}
                {loadingLocations && <Loader />}
                {loadingApplications && <Loader />}
                {loadingUserCreate && <Loader />}
                {loadingApplicationDetails && <Loader />}
                {loadingApplicationStatus && <Loader />}

                {/* ERROR HANDLERS MESSAGES */}
                {message && <Message variant='danger'>{message}</Message>}

                {/* API ERRORS RESPONSE */}
                {error && <Message variant='danger'>{error}</Message>}
                {errorRoles && <Message variant='danger'>{errorRoles}</Message>}
                {errorLocations && <Message variant='danger'>{errorLocations}</Message>}
                {errorApplications && <Message variant='danger'>{errorApplications}</Message>}
                {errorUserCreate && <Message variant='danger'>{errorUserCreate}</Message>}
                {errorApplicationDetails && <Message variant='danger'>{errorApplicationDetails}</Message>}
                {errorApplicationStatus && <Message variant='danger'>{errorApplicationStatus}</Message>}

                {/* API SUCCESS RESPONSE */}
                {successUserCreate && <Message variant='info'>User is created successfully!</Message>}
                {successApplicationStatus && <Message variant='info'>Application is updated successfully!</Message>}

                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-work">
                            <h3 className='d-flex justify-content-center'> Ibex Dashboards</h3>
                            <p>NtLogin</p>
                            <Form onSubmit={submitNtLoginHandler}>
                                <Form.Group controlId="NtLogin">
                                    <Form.Control type="text" placeholder="Enter NtLogin" value={ntLogin} onChange={e => setNtLogin(e.target.value)}
                                    />
                                </Form.Group>
                                <Button type="submit" variant='info' className="my-3 rounded w-100">
                                    Get Info
                                </Button>
                            </Form>
                            {ibexUser && <Form>
                                <>
                                    <p>Applications</p>
                                    <Form.Group controlId="formBasicSelect">
                                        <Form.Control
                                            as="select"
                                            value={application}
                                            onChange={onApplicationChangeHandler}
                                        >
                                            <option disabled value="">Select Applcation</option>
                                            {applications && applications.length > 0 && applications.map((app) => (
                                                <option key={app.name} value={app.name}>{app.name}</option>
                                            ))}

                                        </Form.Control>
                                    </Form.Group>
                                </>
                                {roles && roles.length > 0 &&
                                    <>
                                        <p>Roles</p>
                                        <Form.Group controlId="formBasicSelect">
                                            <Form.Control
                                                as="select"
                                                value={role}
                                                onChange={e => {
                                                    setRole(e.target.value);
                                                }}
                                            >
                                                <option disabled value="">Select Role</option>
                                                {roles && roles.length > 0 && application && roles.map((rol) => (
                                                    <option key={rol.name} value={rol.name}>{rol.name}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </>
                                }
                                {locations && locations.length > 0 &&
                                    <>
                                        <p>Locations</p>
                                        <Form.Group controlId="formBasicSelect">
                                            <Select
                                                value={location}
                                                isMulti
                                                onChange={setLocation}
                                                options={locations}
                                            />
                                        </Form.Group>
                                    </>
                                }
                                <Button type="submit" onClick={applicationUserCreateHandler} variant='success' disabled={application ? false: true} className="my-3 rounded w-100">
                                    Create User
                                </Button>
                                <Button type="submit" onClick={submitApplicationHandler} variant='dark' disabled={application ? false : true} className="rounded w-100">
                                    Get Application Status
                                </Button>

                            </Form>
                            }

                        </div>
                        <div className="profile-work">
                            <p>
                                Applcation Status
                            </p>
                            <Radio.Group className='d-flex' onChange={onApplicationStatusHandler} disabled={successApplicationDetails ? false : true} value={applicationStatus !== '' ? applicationStatus : applicationDetails} buttonStyle="info">
                                <Radio.Button className='text-center w-100 mr-1' value={true}>Enabled</Radio.Button>
                                <Radio.Button className='text-center w-100' value={false}>Disabled</Radio.Button>
                            </Radio.Group>

                        </div>

                    </div>
                    {Object.keys(ibexUser).length > 0 ? <IbexProfileDetails data={ibexUser} /> :
                        !loading && <div className="col-md-8">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <h5>No Records Found</h5>
                                </div>
                            </div>
                        </div>
                    }
                </div>

            </div>
        </>
    )
}

export default HomeScreen
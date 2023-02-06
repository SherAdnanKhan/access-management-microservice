import axios from "axios";
import {
    APPLICATIONS_FAIL, APPLICATIONS_REQUEST, APPLICATIONS_SUCCESS,
    APPLICATION_DETAILS_FAIL, APPLICATION_DETAILS_REQUEST, APPLICATION_DETAILS_RESET, APPLICATION_DETAILS_SUCCESS,
    APPLICATION_STATUS_FAIL, APPLICATION_STATUS_REQUEST, APPLICATION_STATUS_SUCCESS,
    APPLICATION_USER_CREATE_FAIL,
    APPLICATION_USER_CREATE_REQUEST,
    APPLICATION_USER_CREATE_SUCCESS,
    LOCATION_SUCCESS,
    NTN_USER_FAIL, NTN_USER_REQUEST, NTN_USER_SUCCESS,
    ROLES_FAIL, ROLES_REQUEST, ROLES_RESET, ROLES_SUCCESS
} from "../constants/applicationConstants";

export const getNtLoginUser = (payload) => async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();
    try {
        dispatch({
            type: NTN_USER_REQUEST
        })
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/v1/users/ibexuser`, { payload }, config);
        dispatch({
            type: APPLICATION_DETAILS_RESET
        })
        dispatch({
            type: NTN_USER_SUCCESS, payload: data.data
        })
        dispatch(getApplications());


    } catch (error) {
        dispatch({
            type: NTN_USER_FAIL, payload: error.response &&
                error.response.data.error ? error.response.data.error : error.message
        })
    }
}

export const getApplications = () => async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();
    try {
        dispatch({
            type: APPLICATIONS_REQUEST
        })
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/v1/applications`, config);
        dispatch({
            type: APPLICATIONS_SUCCESS, payload: data.data
        })

    } catch (error) {
        dispatch({
            type: APPLICATIONS_FAIL, payload: error.response &&
                error.response.data.error ? error.response.data.error : error.message
        })
    }
}


export const getRoles = (id) => async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();
    try {
        dispatch({
            type: ROLES_REQUEST
        })
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/v1/applications/${id}/roles`, config);
        if (id === 'announcement') {
            dispatch({
                type: ROLES_RESET
            })
            dispatch({
                type: LOCATION_SUCCESS, payload: data.data
            })
        }
        else {
            dispatch({
                type: ROLES_SUCCESS, payload: data.data
            })
        }

    } catch (error) {
        dispatch({
            type: ROLES_FAIL, payload: error.response &&
                error.response.data.error ? error.response.data.error : error.message
        })
    }
}


export const getApplicationDetails = (payload) => async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();
    try {
        dispatch({
            type: APPLICATION_DETAILS_REQUEST
        })
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/v1/applications/application-status`, { payload }, config);
        dispatch({
            type: APPLICATION_DETAILS_SUCCESS, payload: data.data
        })

    } catch (error) {
        dispatch({
            type: APPLICATION_DETAILS_FAIL, payload: error.response &&
                error.response.data.error ? error.response.data.error : error.message
        })
    }
}

export const applicationCreateUser = (payload) => async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();
    try {
        dispatch({
            type: APPLICATION_USER_CREATE_REQUEST
        })
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/v1/applications/user`, { payload }, config);
        dispatch({
            type: APPLICATION_USER_CREATE_SUCCESS, payload: data.data
        })

    } catch (error) {
        dispatch({
            type: APPLICATION_USER_CREATE_FAIL, payload: error.response &&
                error.response.data.error ? error.response.data.error : error.message
        })
    }
}

export const updateApplicationStatus = (payload) => async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();
    try {
        dispatch({
            type: APPLICATION_STATUS_REQUEST
        })
        const config = {
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post('/api/v1/applications/application/update', { payload }, config);


        dispatch({
            type: APPLICATION_STATUS_SUCCESS,
            payload: data.data,
        });

    } catch (error) {
        dispatch({
            type: APPLICATION_STATUS_FAIL, payload: error.response &&
                error.response.data.error ? error.response.data.error : error.message
        })
    }
}
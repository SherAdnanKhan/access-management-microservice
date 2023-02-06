import axios from "axios";
import {
    USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT,
    USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS
} from "../constants/userConstants";


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }

        const { data } = await axios.post('api/v1/auth/login', { email, password }, config);
        dispatch({
            type: USER_LOGIN_SUCCESS, payload: data.data
        })
        localStorage.setItem('userInfo', JSON.stringify(data.data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL, payload: error.response &&
                error.response.data.error ? error.response.data.error : error.message
        })
    }
}

export const logout = () => async (dispatch) => {
    dispatch({
        type: USER_LOGOUT
    })
    dispatch({ type: USER_DETAILS_RESET })
    localStorage.removeItem('userInfo');
    document.location.href = '/login'
}


export const getMe = (id) => async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/v1/auth/${id}`, config);
        dispatch({
            type: USER_DETAILS_SUCCESS, payload: data.data
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL, payload: error.response &&
                error.response.data.error ? error.response.data.error : error.message
        })
    }
}

export const updatedetails = (user) => async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })
        const config = {
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put('/api/v1/auth/updatedetails', { user }, config);

        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data.data,
        });
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.data,
        });
        
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data.data,
        });

        localStorage.setItem('userInfo', JSON.stringify(data.data));
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL, payload: error.response &&
                error.response.data.error ? error.response.data.error : error.message
        })
    }
}

export const userUpdatedetails = (user) => async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })
        const config = {
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/v1/users/${user.id}`, { user }, config);
        dispatch({
            type: USER_DETAILS_SUCCESS, payload: data.data
        })
        dispatch({
            type: USER_UPDATE_SUCCESS, payload: data.data
        })
        localStorage.setItem('userInfo', JSON.stringify(data.data))
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL, payload: error.response &&
                error.response.data.error ? error.response.data.error : error.message
        })
    }
}


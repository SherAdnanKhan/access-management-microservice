import { LOGS_FAIL, LOGS_REQUEST, LOGS_SUCCESS } from "../constants/logConstants";
import axios from "axios";
import qs from 'qs';

const getRandomuserParams = (params) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
});

export const getLogs = (params) => async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();
    try {
        dispatch({
            type: LOGS_REQUEST
        })
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/v1/logs?${qs.stringify(getRandomuserParams(params))}`, config);
        dispatch({
            type: LOGS_SUCCESS, payload: data.data
        })

    } catch (error) {
        dispatch({
            type: LOGS_FAIL, payload: error.response &&
                error.response.data.error ? error.response.data.error : error.message
        })
    }
}
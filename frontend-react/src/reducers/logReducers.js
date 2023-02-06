import { LOGS_FAIL, LOGS_REQUEST, LOGS_RESET, LOGS_SUCCESS } from "../constants/logConstants";

export const logDetailsReducers = (state = {
    pagination: {
        current: 1,
        pageSize: 10,
        total: 10,
    }
}, action) => {
    switch (action.type) {
        case LOGS_REQUEST:
            return { ...state, loading: true };
        case LOGS_SUCCESS:
            return { loading: false, success: true, logDetails: action.payload, pagination: { current: action.payload.currentPage + 1, pageSize: action.payload.totalPages, total: action.payload.totalItems } }
        case LOGS_FAIL:
            return { ...state, loading: false, error: action.payload };
        case LOGS_RESET:
            return {}
        default:
            return state;
    }
}
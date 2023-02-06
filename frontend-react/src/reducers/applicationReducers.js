import {
    APPLICATIONS_FAIL, APPLICATIONS_REQUEST, APPLICATIONS_RESET, APPLICATIONS_SUCCESS,
    APPLICATION_DETAILS_FAIL, APPLICATION_DETAILS_REQUEST, APPLICATION_DETAILS_RESET, APPLICATION_DETAILS_SUCCESS,
    APPLICATION_STATUS_FAIL, APPLICATION_STATUS_REQUEST, APPLICATION_STATUS_RESET, APPLICATION_STATUS_SUCCESS,
    APPLICATION_USER_CREATE_FAIL,
    APPLICATION_USER_CREATE_REQUEST,
    APPLICATION_USER_CREATE_SUCCESS,
    LOCATION_FAIL,
    LOCATION_REQUEST,
    LOCATION_RESET,
    LOCATION_SUCCESS,
    NTN_USER_FAIL, NTN_USER_REQUEST, NTN_USER_RESET, NTN_USER_SUCCESS,
    ROLES_FAIL, ROLES_REQUEST, ROLES_RESET, ROLES_SUCCESS
} from "../constants/applicationConstants";


const initialState = {
    loading: false, error: '', ibexUser: {}
}
export const ntLoginUserReducers = (state = initialState, action) => {
    switch (action.type) {
        case NTN_USER_REQUEST:
            return { ...state, loading: true };
        case NTN_USER_SUCCESS:
            return { loading: false, success: true, ibexUser: action.payload };
        case NTN_USER_FAIL:
            return { ...state, loading: false, error: action.payload };
        case NTN_USER_RESET:
            return { ibexUser: {} };
        default:
            return state;
    }
}

export const applicationsReducers = (state = { applications: {} }, action) => {
    switch (action.type) {
        case APPLICATIONS_REQUEST:
            return { ...state, loading: true };
        case APPLICATIONS_SUCCESS:
            return { loading: false, applications: action.payload };
        case APPLICATIONS_FAIL:
            return { ...state, loading: false, error: action.payload };
        case APPLICATIONS_RESET:
            return {};
        default:
            return state;
    }
}

export const rolesReducers = (state = { roles: {} }, action) => {
    switch (action.type) {
        case ROLES_REQUEST:
            return { ...state, loading: true };
        case ROLES_SUCCESS:
            return { loading: false, roles: action.payload };
        case ROLES_FAIL:
            return { ...state, loading: false, error: action.payload };
        case ROLES_RESET:
            return {};
        default:
            return state;
    }
}


export const locationReducers = (state = { locations: {} }, action) => {
    switch (action.type) {
        case LOCATION_REQUEST:
            return { ...state, loading: true };
        case LOCATION_SUCCESS:
            return { loading: false, locations: action.payload };
        case LOCATION_FAIL:
            return { ...state, loading: false, error: action.payload };
        case LOCATION_RESET:
            return {};
        default:
            return state;
    }
}

export const applicationUserReducers = (state = {}, action) => {
    switch (action.type) {
        case APPLICATION_USER_CREATE_REQUEST:
            return { ...state, loading: true };
        case APPLICATION_USER_CREATE_SUCCESS:
            return { loading: false, success: true }
        case APPLICATION_USER_CREATE_FAIL:
            return { ...state, loading: false, error: action.payload };
        case APPLICATION_STATUS_RESET:
            return {}
        default:
            return state;
    }
}

export const applicationDetailsReducers = (state = {}, action) => {
    switch (action.type) {
        case APPLICATION_DETAILS_REQUEST:
            return { ...state, loading: true };
        case APPLICATION_DETAILS_SUCCESS:
            return { loading: false, success: true, applicationDetails: action.payload }
        case APPLICATION_DETAILS_FAIL:
            return { ...state, loading: false, error: action.payload };
        case APPLICATION_DETAILS_RESET:
            return {}
        default:
            return state;
    }
}


export const applicationStatusReducers = (state = {}, action) => {
    switch (action.type) {
        case APPLICATION_STATUS_REQUEST:
            return { ...state, loading: true };
        case APPLICATION_STATUS_SUCCESS:
            return { loading: false, success: true, applicationStatus: action.payload }
        case APPLICATION_STATUS_FAIL:
            return { ...state, loading: false, error: action.payload };
        case APPLICATION_STATUS_RESET:
            return {}
        default:
            return state;
    }
}
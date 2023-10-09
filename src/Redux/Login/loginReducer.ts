import
{
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    UPDATE_ACCESS_TOKEN
}
from "Redux/Login/loginTypes";

const initialState = {
    loginLoading: false,
    userType: null,
    userData: null,
    accessToken: null,
    refreshToken: null,
    errors: null,
}

export const loginReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOGIN_LOADING :
            return {...state, loginLoading: action.payload};
        case LOGIN_SUCCESS :
            return {...state, userType: action.payload.user.type, userData: action.payload.data, accessToken: action.payload.tokens.accessToken, refreshToken: action.payload.tokens.refreshToken};
        case UPDATE_ACCESS_TOKEN :
            return {...state, accessToken: action.payload};
        case LOGIN_FAILURE :
            return {...state, errors: action.payload};
        default:
            return state;
    }
}
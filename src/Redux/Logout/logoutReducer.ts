import 
{
    LOGOUT_LOADING,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE
}
from "redux/Logout/logoutTypes";

const initialState = {
    logoutLoading: false,
    logoutSuccess: null,
    errors: null,
}

export const logoutReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOGOUT_LOADING :
            return {...state, logoutLoading: action.payload};
        case LOGOUT_SUCCESS :
            return {...state, logoutSuccess: action.payload};
        case LOGOUT_FAILURE :
            return {...state, errors: action.payload};
        default:
            return state;
    }
}
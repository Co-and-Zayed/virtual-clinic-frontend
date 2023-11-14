import
{
    VERIFY_OTP_LOADING,
    VERIFY_OTP_SUCCESS,
    VERIFY_OTP_FAILURE
}
from "redux/ForgetPassword/VerifyOtp/verifyOtpTypes";

const initialState = {
    verifyOtpLoading: false,
    verifyOtpSuccess: null,
    errors: null
}

export const verifyOtpReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case VERIFY_OTP_LOADING :
            return {...state, verifyOtpLoading: action.payload};
        case VERIFY_OTP_SUCCESS :
            
            return {...state, verifyOtpSuccess: action.payload.success};
        case VERIFY_OTP_FAILURE :
            return {...state, errors: action.payload};
        default:
            return state;
    }
}
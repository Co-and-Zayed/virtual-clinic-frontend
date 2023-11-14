import
{
    FORGET_PASSWORD_LOADING,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_FAILURE
}
from "redux/ForgetPassword/forgetPasswordTypes";

import { Dispatch } from "redux";

import { forgetPasswordService } from "services/ForgetPasswordServices/forgetPasswordService";

export const forgetPasswordAction = (data: any) => async (dispatch: Dispatch) => {
    try {
        dispatch({type: FORGET_PASSWORD_LOADING, payload: true});
        const response = await forgetPasswordService(data);
        dispatch({type: FORGET_PASSWORD_SUCCESS, payload: response.data});
    } catch (err) {
        dispatch({type: FORGET_PASSWORD_FAILURE, payload: err});
    } finally {
        dispatch({type: FORGET_PASSWORD_LOADING, payload: false});
    }
}
import { combineReducers } from "redux";
import { loginReducer } from "Redux/Login/loginReducer";
import { registerReducer } from "Redux/Register/registerReducer";

export const appReducer = combineReducers({
  loginReducer,
  registerReducer
});

export const rootReducers = (state: any, action: any) => {
    if (action.type === "LOG_OUT") {
      return appReducer(undefined, action);
    }
    return appReducer(state, action);
  };
  
  export type RootState = ReturnType<typeof rootReducers>;
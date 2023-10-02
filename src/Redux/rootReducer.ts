import { combineReducers } from "redux";

export const appReducer = combineReducers({

});

export const rootReducers = (state: any, action: any) => {
    if (action.type === "LOG_OUT") {
      return appReducer(undefined, action);
    }
    return appReducer(state, action);
  };
  
  export type RootState = ReturnType<typeof rootReducers>;
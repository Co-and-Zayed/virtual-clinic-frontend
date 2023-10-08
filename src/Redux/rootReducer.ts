import { combineReducers } from "redux";
import { listAllUsersReducer } from "./VirtualClinicRedux/ListAllUsers/listAllUsersReducer";

export const appReducer = combineReducers({
  listAllUsersReducer,
});

export const rootReducers = (state: any, action: any) => {
  if (action.type === "LOG_OUT") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducers>;

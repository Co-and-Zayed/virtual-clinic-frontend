import { combineReducers } from "redux";
import { listAllUsersReducer } from "./VirtualClinicRedux/ListAllUsers/listAllUsersReducer";
import { listAllPackagesReducer } from "./VirtualClinicRedux/ListAllPackages/listAllPackagesReducer";

export const appReducer = combineReducers({
  listAllUsersReducer,
  listAllPackagesReducer,
});

export const rootReducers = (state: any, action: any) => {
  if (action.type === "LOG_OUT") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducers>;

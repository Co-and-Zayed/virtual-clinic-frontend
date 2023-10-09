import { Outlet } from "react-router-dom";
import MainViewContainer from "components/MainViewContainer/MainViewContainer";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshAccessTokenService } from "services/refreshAccessTokenService";
import { UPDATE_ACCESS_TOKEN } from "redux/User/loginTypes";
import { RootState } from "redux/rootReducer";

const ProtectedRoutes = () => {
  return (
    <MainViewContainer>
      <Outlet />
    </MainViewContainer>
  );
};

export default ProtectedRoutes;

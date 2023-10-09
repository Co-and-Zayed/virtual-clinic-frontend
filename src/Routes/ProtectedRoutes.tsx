import { Outlet } from "react-router-dom";
import MainViewContainer from "components/MainViewContainer/MainViewContainer";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshAccessTokenService } from "services/refreshAccessTokenService";
import { UPDATE_ACCESS_TOKEN } from "redux/User/loginTypes";
import { RootState } from "redux/rootReducer";

const ProtectedRoutes = () => {
  const dispatch: any = useDispatch();

  // const hasMounted = useRef(false);
  const { loginLoading, userType, accessToken, refreshToken } = useSelector(
    (state: RootState) => state.userReducer
  );

  async function refreshTokenMethod() {
    try {
      if (accessToken !== null || refreshToken !== null) {
        const newAccessToken = (await refreshAccessTokenService()).data;
        dispatch({
          type: UPDATE_ACCESS_TOKEN,
          payload: newAccessToken?.accessToken,
        });
      }
      setTimeout(refreshTokenMethod, 10000);
    } catch (err) {
      setTimeout(refreshTokenMethod, 10000);
    }
  }

  useEffect(() => {
    // This effect will be triggered whenever `createdAdmin` changes.
    refreshTokenMethod();
  }, []);

  return (
    <MainViewContainer>
      <Outlet />
    </MainViewContainer>
  );
};

export default ProtectedRoutes;

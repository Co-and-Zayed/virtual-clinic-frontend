import { Outlet } from "react-router-dom";
import MainViewContainer from "components/MainViewContainer/MainViewContainer";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshAccessTokenService } from "services/refreshAccessTokenService";
import store from "redux/store";
import {
  UPDATE_ACCESS_TOKEN,
  SHOULD_REFRESH,
  REFRESH_TIMEOUT,
} from "redux/User/loginTypes";
import { RootState } from "redux/rootReducer";

const ProtectedRoutes = () => {
  const dispatch: any = useDispatch();

  const { shouldRefresh, refreshTimeout } = useSelector(
    (state: RootState) => state.userReducer
  );

  var refreshInterval = 888; // IN SECONDS
  async function refreshTokenMethod() {
    const currentValue = store.getState()?.userReducer?.shouldRefresh;
    try {
      if (currentValue === "START") {
        const newAccessToken = (await refreshAccessTokenService()).data;
        dispatch({
          type: UPDATE_ACCESS_TOKEN,
          payload: newAccessToken?.accessToken,
        });
      }
    } catch (err) {}
  }

  useEffect(() => {
    const currentValue = store.getState()?.userReducer?.shouldRefresh;
    if (currentValue === "START") {
      // RECURSIVE METHOD TO KEEP SENDING REQUESTS
      const refreshAccessToken = async () => {
        refreshTokenMethod();
        // SHEDULE THE NEXT REFRESH
        if (currentValue === "START") {
          setTimeout(refreshAccessToken, refreshInterval * 1000);
        }
      };

      // START THE RECURSIVE METHOD
      const refreshTokenTimeout = setTimeout(
        refreshAccessToken,
        refreshInterval * 1000
      );

      // STORE THE REFRESH TIMEOUT IN REDUX
      dispatch({
        type: REFRESH_TIMEOUT,
        payload: refreshTokenTimeout,
      });
    } else if (currentValue === "OFF") {
      // CLEAR REFRESH TIMEOUT
      clearTimeout(refreshTimeout);
      dispatch({
        type: REFRESH_TIMEOUT,
        payload: null,
      });
    }
  }, [shouldRefresh]);

  return (
    <MainViewContainer>
      <Outlet />
    </MainViewContainer>
  );
};

export default ProtectedRoutes;

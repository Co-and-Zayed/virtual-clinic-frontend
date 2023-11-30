import { Outlet } from "react-router-dom";
import MainViewContainer from "Pharmacy/components/MainViewContainer/MainViewContainer";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshAccessTokenService } from "Pharmacy/services/refreshAccessTokenService";
import store from "VirtualClinic/redux/store";
import {
  UPDATE_ACCESS_TOKEN,
  ADD_TIMEOUT,
  CLEAR_TIMEOUTS,
} from "Pharmacy/redux/User/loginTypes";
import { RootState } from "VirtualClinic/redux/rootReducer";

const ProtectedRoutes = () => {
  const dispatch: any = useDispatch();
  const [counter, setCounter] = useState(0);

  const { shouldRefresh, refreshTimeout, allTimeouts } = useSelector(
    (state: RootState) => state.userReducer
  );

  var refreshInterval = 594; // IN SECONDS (9 minutes 54 seconds)
  async function refreshTokenMethod() {
    console.log("sending refresh request...");
    const currentValue = store.getState()?.userReducer?.shouldRefresh;
    try {
      if (currentValue === "START") {
        const newAccessToken = (await refreshAccessTokenService()).data;
        setCounter((prev) => prev + 1);
        dispatch({
          type: UPDATE_ACCESS_TOKEN,
          payload: newAccessToken?.accessToken,
        });
      }
    } catch (err) {}
  }

  const clearRefreshTimeout = async () => {
    await dispatch({
      type: CLEAR_TIMEOUTS,
    });
  };

  useEffect(() => {
    console.log("SENT REFRESH TOKEN REQUEST:", counter, allTimeouts);
  }, [counter]);

  useEffect(() => {
    const currentValue = store.getState()?.userReducer?.shouldRefresh;
    if (currentValue === "START") {
      // RECURSIVE METHOD TO KEEP SENDING REQUESTS
      const refreshAccessToken = async () => {
        refreshTokenMethod();
        // SHEDULE THE NEXT REFRESH
        if (currentValue === "START") {
          const newTimeout = setTimeout(
            refreshAccessToken,
            refreshInterval * 1000
          );
          dispatch({
            type: ADD_TIMEOUT,
            payload: newTimeout,
          });
        }
      };

      // START THE RECURSIVE METHOD
      refreshTokenMethod();
      const refreshTokenTimeout = setTimeout(
        refreshAccessToken,
        refreshInterval * 1000
      );

      // STORE THE REFRESH TIMEOUT IN REDUX
      dispatch({
        type: ADD_TIMEOUT,
        payload: refreshTokenTimeout,
      });
    } else if (currentValue === "OFF") {
      clearRefreshTimeout();
    }
  }, [shouldRefresh]);

  return (
    <MainViewContainer>
      <Outlet />
    </MainViewContainer>
  );
};

export default ProtectedRoutes;

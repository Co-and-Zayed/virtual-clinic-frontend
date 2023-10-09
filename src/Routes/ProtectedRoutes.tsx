import { Outlet } from "react-router-dom";
import MainViewContainer from "components/MainViewContainer/MainViewContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refreshAccessTokenService } from "services/refreshAccessTokenService";
import { UPDATE_ACCESS_TOKEN } from "Redux/Login/loginTypes";

const ProtectedRoutes = () => {
  const dispatch: any = useDispatch();

  useEffect(() => {
    async function refreshToken() {
      try {
        const newAccessToken = (await refreshAccessTokenService()).data;
        dispatch({type: UPDATE_ACCESS_TOKEN, payload: newAccessToken?.accessToken});
        setTimeout(refreshToken, 50000); 
      } catch (err) {
        return;
      }
    }

    refreshToken();

  }, []);

  return (
    <MainViewContainer>
      <Outlet />
    </MainViewContainer>
  );
};

export default ProtectedRoutes;

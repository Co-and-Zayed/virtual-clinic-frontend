import { Outlet } from "react-router-dom";
import MainViewContainer from "components/MainViewContainer/MainViewContainer";


const ProtectedRoutes = () => {

  return (
    <MainViewContainer>
      <Outlet />
    </MainViewContainer>
  );
};

export default ProtectedRoutes;

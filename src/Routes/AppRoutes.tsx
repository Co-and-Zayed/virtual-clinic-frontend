import { Route, Routes } from "react-router-dom";
import { routes } from "Routes/VirtualClinicRoutes/routes";

const AppRoutes = () => {
  return (
    <Routes>
      {routes?.map(({ path, element, parent }, index) => {
        if (parent) {
          return (
            <Route key={index} element={parent}>
              <Route element={element} path={path} />
            </Route>
          );
        }
        return <Route key={index} element={element} path={path} />;
      })}
    </Routes>
  );
};

export default AppRoutes;

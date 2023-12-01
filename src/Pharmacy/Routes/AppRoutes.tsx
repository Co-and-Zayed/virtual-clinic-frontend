import { Route, Routes } from "react-router-dom";
import { routes } from "Pharmacy/Routes/PharmacyRoutes/routes";

const AppRoutes = () => {
  return (
    <Routes>
      {routes?.map(({ path, element, parent, system }, index) => {
        if (parent) {
          return (
            <Route key={index} element={parent}>
              <Route element={element} path={system + path} />
            </Route>
          );
        }
        return <Route key={index} element={element} path={system + path} />;
      })}
    </Routes>
  );
};

export default AppRoutes;

import 
{
    HOME_PATH
}
from "Routes/paths";

import ProtectedRoutes from "Routes/ProtectedRoutes";

import HomeScreen from "screens/HomeScreen/HomeScreen";

export const routes = [
    {
        path: HOME_PATH,
        element: <HomeScreen />,
        parent: <ProtectedRoutes />
    }
]
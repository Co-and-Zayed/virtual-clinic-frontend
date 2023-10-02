import 
{
    HOME_PATH, LOGIN_PATH
}
from "Routes/paths";

import ProtectedRoutes from "Routes/ProtectedRoutes";

import HomeScreen from "screens/HomeScreen/HomeScreen";
import LoginScreen from "screens/LoginScreen/LoginScreen";

export const routes = [
    {
        path: HOME_PATH,
        element: <HomeScreen />,
        parent: <ProtectedRoutes />
    },
    {
        path: LOGIN_PATH,
        element: <LoginScreen />,
        parent: <ProtectedRoutes />
    }
]
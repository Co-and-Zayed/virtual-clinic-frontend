import ReactDOM from "react-dom/client";
import "index.css";
import "screens/VirtualClinicScreens/User Screens/Patient Screens/DoctorsScreen/Calendar.css";
import App from "App";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "VirtualClinic/redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>
);

import AppRoutes from "Routes/AppRoutes";
import { AnimatePresence } from "framer-motion";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AnimatePresence mode="wait">
        <AppRoutes />
      </AnimatePresence>
    </LocalizationProvider>
  );
};

export default App;

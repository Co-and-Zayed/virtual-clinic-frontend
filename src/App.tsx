import AppRoutes from "VirtualClinic/Routes/AppRoutes";
import { AnimatePresence } from "framer-motion";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ConfigProvider } from "antd";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#163B45",
            // colorBgContainer: "transparent"
          },
          components: {
            Input: {
              colorBgContainer: "transparent",
            },
            Select: {
              colorBgContainer: "transparent",
              // colorBorderBg: "#163B45",
            },
          },
        }}
      >
        <AnimatePresence mode="wait">
          <AppRoutes />
        </AnimatePresence>
      </ConfigProvider>
    </LocalizationProvider>
  );
};

export default App;

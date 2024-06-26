import styles from "Pharmacy/screens/CommonScreens/CommonMedicineScreen/CommonMedicineScreen.module.css";
import { useNav } from "Pharmacy/hooks/useNav";
import { useEffect, useState } from "react";

import MedicineScreen from "Pharmacy/screens/User Screens/Patient Screens/MedicineScreen/MedicineScreen";
import { RootState } from "VirtualClinic/redux/rootReducer";
import { useSelector } from "react-redux";

const CommonMedicineScreen = () => {
  const { loginLoading, userType } = useSelector(
    (state: RootState) => state.userReducer
  );
  return <MedicineScreen />;
};

export default CommonMedicineScreen;

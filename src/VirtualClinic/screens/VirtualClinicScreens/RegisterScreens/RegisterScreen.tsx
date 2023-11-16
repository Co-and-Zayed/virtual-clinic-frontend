import { useState } from "react";
import PatientRegisterScreen from "VirtualClinic/screens/VirtualClinicScreens/RegisterScreens/PatientRegisterScreen/PatientRegisterScreen";
import DoctorRegisterScreen from "VirtualClinic/screens/VirtualClinicScreens/RegisterScreens/DoctorRegisterScreen/DoctorRegisterScreen";

const RegisterScreen = () => {
  /*
        - 0 Patient
        - 1 Doctor
    */
  const [registerType, setRegisterType] = useState(0);

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center">
      <div className="w-full flex items-center justify-center gap-x-2">
        <p>Regsiter as a</p>
        <p
          className="text-[blue] hover:cursor-pointer"
          onClick={() => setRegisterType(1)}
        >
          Doctor
        </p>
        <p>or as a</p>
        <p
          className="text-[blue] hover:cursor-pointer"
          onClick={() => setRegisterType(0)}
        >
          Patient
        </p>
      </div>
      {registerType === 0 ? (
        <PatientRegisterScreen />
      ) : (
        <DoctorRegisterScreen />
      )}
    </div>
  );
};

export default RegisterScreen;

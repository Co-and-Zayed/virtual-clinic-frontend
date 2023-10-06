import styles from "screens/VirtualClinicScreens/User Screens/Doctor Screens/PatientsScreen/PatientsScreen.module.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";


const PatientsScreen = () => {
  const[patients, setPatients] = useState<any[]>([])
  useEffect(() =>{
    const fetchPatients = async () =>{
      const response = await fetch('/doctor/getPatients')
      const json = await response.json()

      if(response.ok){
        setPatients(json)
      }
    }
    fetchPatients()
  }, [])

  return (
    <div className={`w-full flex flex-col items-start justify-center`}>
      <h1>Doctor Patients Screen</h1>
      <div className="patients">
        {patients && patients.map((patient)=>(
          <p key={patient['_id']}>{patient}</p>
        ))}
      </div>
    </div>
  );
};

export default PatientsScreen;

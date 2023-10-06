import styles from "screens/VirtualClinicScreens/User Screens/Doctor Screens/PatientsScreen/PatientsScreen.module.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";


const PatientsScreen = () => {
  const[patients, setPatients] = useState<any[]>([])
  useEffect(() =>{
    const fetchPatients = async () =>{

      const email = "seif@gmail.com";
      const requestBody = JSON.stringify({ doctor: email });

      const response = await fetch('/doctor/getPatients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: requestBody,
        })
      const json = await response.json()

      if(response.ok){
        setPatients(json)
      }
    }
    fetchPatients()
  }, [])

  const[patientInfo, setPatientInfo] = useState<any[]>([])
  useEffect(() =>{
    const fetchPatientInfo = async () =>{

      const _id = "";
      const requestBody = JSON.stringify({ _id: _id });

      const response = await fetch('/doctor/getPatientInfo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: requestBody,
        })
      const json = await response.json()

      if(response.ok){
        setPatientInfo(json)
      }
    }
    fetchPatientInfo()
  }, [])

  return (
    <div className={`w-full flex flex-col items-start justify-center`}>
      <h1>Doctor Patients Screen</h1>
      <div className="patients">
        {patients && patients.map((patient)=>(
          <button key={patient['_id']}>{patient.name}</button>
        ))}
      </div>
    </div>
  );
};

export default PatientsScreen;

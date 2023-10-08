export const listAllUsers = () => {
  return `userAPI/getUsers`;
};


// SHADY URLs
// Patient Get All Doctors 
export const patientGetDoctors = () => {
  return `patient/getDoctors`;
};

// Patient Search for Doctors By Name and/or Speciality
export const patientSearchDoctors = () => {
  return `patient/getDoctorsByNameSpeciality`;
};

// List All Specialities
export const allSpecialities = () => {
  return `dropdown/specialities`;
};


// ZEINA URLs
export const getDoctorInfo = () => {
  return "patient/getDoctordetails";

  
//// NEVEEN URLs
export const listAllPatients = () => {
    return `doctor/getPatients`;
};

export const listPatientInfo = () => {
  return `doctor/getPatientInfo`;
};

export const listPatientByName = () => {
  return `doctor/getPatientByName/`;
};

export const listUpcomingPatients = () => {
  return `doctor/getUpcomingAptmnts/`;
};

export const viewSettings = () => {
  return `doctor/viewSettings`;
};

export const editSettings = () => {
  return `doctor/editSettings`;
};

//// MOSTAFA URLs
export const createAppointment = ()=> {
  return `patientAPI/createAppointment`;
};
export const getAppointments = (type: any)=> {
  return `patientAPI/getAppointments/${type}`;
};
export const deleteAppointment = (id: any)=> {
  return `patientAPI/deleteAppointment/${id}`;
};
export const updateAppointment = (id: any)=> {
  return `patientAPI/updateAppointment/${id}`;
};
export const addFamilyMember = ()=> {
  return "patientAPI/addFamilyMember";
};
export const getFamilyMembers = ()=>{
  return "patientAPI/getFamilyMembers";
};

// YOUSSEF URLs
export const listAllPrescriptions = () => {
  return "prescriptionAPI/getPrescriptions";
};

export const listSinglePrescription = (id: any) => {
  return `prescriptionAPI/getPrescription/${id}`;
}

// SEIF URLs
export const listAllPackages = () => {
  return `adminAPI/getPackages`;
};

export const updatePackage = (id: any) => {
  return `adminAPI/updatePackage/${id}`;
};

export const createPackage = () => {
  return `adminAPI/createPackage`;
};

export const deletePackage = (id: any) => {
  return `adminAPI/deletePackage/${id}`;
};

export const listAllAdmins = (id: any) => {
  return `adminAPI/viewAllAdmins/${id}`;
};

export const createAdmin = () => {
  return `adminAPI/createAdmin`;
};

export const deleteAdmin = () => {
  return `adminAPI/deleteAdmin`;
};

export const viewDoctors = () => {
  return `adminAPI/viewDoctors`;
};

export const viewPatients = () => {
  return `adminAPI/viewPatients`;
};

export const deleteDoctor = () => {
  return `adminAPI/deleteDoctor`;
};

export const deletePatient = () => {
  return `adminAPI/deletePatient`;
};

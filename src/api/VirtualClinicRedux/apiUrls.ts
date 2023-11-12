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

// Patient Search for Doctors By Name and/or Speciality
export const patientFilterDoctors = () => {
  return `patient/filterDoctors`;
};

// List All Specialities
export const allSpecialities = () => {
  return `dropdown/specialities`;
};

// ZEINA URLs
export const getDoctorInfo = () => {
  return `patient/getDoctordetails`;
};

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

export const listUpcomingAppointments = () => {
  return `doctor/getUpcomingAptmnts/`;
};

export const listPatientAppointments = (userType: any) => {
  return `patient/getAppointments/${userType}`;
};

export const viewSettings = () => {
  return `doctor/viewSettings`;
};

export const editSettings = () => {
  return `doctor/editSettings`;
};

//// MOSTAFA URLs
export const createAppointment = () => {
  return `patient/createAppointment`;
};
export const getAppointments = (type: any) => {
  return `${type.toLowerCase()}/getAppointments`;
};
export const deleteAppointment = (id: any) => {
  return `patient/deleteAppointment/${id}`;
};
export const updateAppointment = (id: any) => {
  return `patient/updateAppointment/${id}`;
};
export const addFamilyMember = () => {
  return "patient/addFamilyMember";
};
export const getFamilyMembers = () => {
  return "patient/getFamilyMembers";
};

// YOUSSEF URLs
export const listAllPrescriptions = () => {
  return "prescriptionAPI/getPrescriptions";
};

export const listSinglePrescription = (id: any) => {
  return `prescriptionAPI/getPrescription/${id}`;
};

// SEIF URLs
export const listAllPackages = () => {
  return `getPackages`;
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

export const acceptDoctor = () => {
  return `adminAPI/acceptDoctor`;
};

export const rejectDoctor = () => {
  return `adminAPI/rejectDoctor`;
};

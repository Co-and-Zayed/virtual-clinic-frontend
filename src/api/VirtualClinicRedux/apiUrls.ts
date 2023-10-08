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
};

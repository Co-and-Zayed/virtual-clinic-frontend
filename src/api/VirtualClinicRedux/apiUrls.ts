export const listAllUsers = () => {
  return `userAPI/getUsers`;
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


export const listAllUsers = () => {
  return `userAPI/getUsers`;
};
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

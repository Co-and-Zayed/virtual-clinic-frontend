export const listAllUsers = () => {
  return `userAPI/getUsers`;
};


export const listAllPatients = () => {
    return `doctor/getPatients`;
};

export const listPatientInfo = (_id:any) => {
  return `doctor/getPatientInfo/${_id}`;
};

export const listPatientByName = (name:any) => {
  return `doctor/getPatientByName/${name}`;
};

// export const listUpcomingPatients = (doctor:any) => {
//   return `doctor/getUpcomingAptmnts/${doctor}`;
// };

export const listUpcomingPatients = () => {
  return `doctor/getUpcomingAptmnts`;
};

export const editSettings = (_id:any) => {
  return `doctor/editSettings/${_id}`;
};
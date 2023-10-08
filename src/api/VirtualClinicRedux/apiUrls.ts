export const listAllUsers = () => {
  return `userAPI/getUsers`;
};


export const listAllPatients = () => {
    return `doctor/getPatients`;
 
};

export const listPatientInfo = () => {
  return `doctor/getPatientInfo`;
};

export const listPatientByName = (name:any) => {
  return `doctor/getPatientByName/${name}`;
};

export const listUpcomingAptmnts = (doctor:any) => {
  return `doctor/getUpcomingAptmnts/${doctor}`;
};

export const viewSettings = () => {
  return `doctor/viewSettings`;
};
export const editSettings = () => {
  return `doctor/editSettings`;
};
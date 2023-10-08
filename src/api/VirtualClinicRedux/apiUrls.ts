export const listAllUsers = () => {
  return `userAPI/getUsers`;
};


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
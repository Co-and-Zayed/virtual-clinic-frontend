export const listAllUsers = () => {
  return `userAPI/getUsers`;
};


export const listAllPatients = () => {
    return `doctor/getPatients`;
 
};

export const listPatientInfo = () => {
  return `doctor/getPatientInfo/`;
};

export const listPatientByName = () => {
  return `doctor/getPatientsByName/`;
};

export const listUpcomingAptmnts = (doctor:any) => {
  return `doctor/getUpcomingAptmnts/${doctor}`;
};

export const editSettings = (_id:any) => {
  return `doctor/editSettings/${_id}`;
};
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

export const listUpcomingAptmnts = (doctor:any) => {
  return `doctor/getUpcomingAptmnts/${doctor}`;
};

export const editSettings = (_id:any) => {
  return `doctor/editSettings/${_id}`;
};
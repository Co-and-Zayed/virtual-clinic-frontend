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

export const listUpcomingPatients = () => {
  return `doctor/getUpcomingAptmnts`;
};

export const editSettings = (_id:any) => {
  return `doctor/editSettings/${_id}`;
};
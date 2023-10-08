export const listAllUsers = () => {
  return `userAPI/getUsers`;
};

export const listAllPrescriptions = () => {
  return "prescriptionAPI/getPrescriptions";
};

export const listSinglePrescription = (id: any) => {
  return `prescriptionAPI/getPrescription/${id}`;
}
export const listAllPackages = () => {
  return `adminAPI/getPackages`;
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

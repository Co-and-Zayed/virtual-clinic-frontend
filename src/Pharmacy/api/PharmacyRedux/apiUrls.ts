export const listAllUsers = () => {
  return `userAPI/getUsers`;
};

// SHADY URLs
// List All Specialities
export const allSpecialities = () => {
  return `dropdown/specialities`;
};

export const addFamilyMember = () => {
  return "patient/addFamilyMember";
};

export const getFamilyMembers = () => {
  return "patient/getFamilyMembers";
};

// YOUSSEF URLs
export const listAllPrescriptions = () => {
  return "prescriptionAPI/getPrescriptions";
};

export const listSinglePrescription = (id: any) => {
  return `prescriptionAPI/getPrescription/${id}`;
};

// SEIF URLs
export const listAllPackages = () => {
  return `admin/getPackages`;
};

export const updatePackage = (id: any) => {
  return `admin/updatePackage/${id}`;
};

export const createPackage = () => {
  return `admin/createPackage`;
};

export const deletePackage = (id: any) => {
  return `admin/deletePackage/${id}`;
};

export const listAllAdmins = (id: any) => {
  return `admin/viewAllAdmins/${id}`;
};

export const createAdmin = () => {
  return `admin/createAdmin`;
};

export const deleteAdmin = () => {
  return `admin/deleteAdmin`;
};

export const viewPatients = () => {
  return `admin/viewPatients`;
};

export const viewPharmacists = () => {
  return `admin/viewPharmacists`;
};

export const deletePatient = () => {
  return `admin/deletePatient`;
};

export const deletePharmacist = () => {
  return `admin/deletePharmacist`;
};

export const listAllMedicines = () => {
  return "getMedicines";
};

export const listAllMedicinalUses = () => {
  return "getMedicinalUses";
};

export const listAllOrders = () => {
  return "orderAPI/getOrders";
};

export const cancelOrder = (id: any) => {
  return `orderAPI/cancelOrder/${id}`;
};

export const acceptDoctor = () => {
  return `admin/acceptDoctor`;
};

export const rejectDoctor = () => {
  return `admin/rejectDoctor`;
};

export const viewAllContracts = () => {
  return `pharmacist/viewAllContracts`;
};

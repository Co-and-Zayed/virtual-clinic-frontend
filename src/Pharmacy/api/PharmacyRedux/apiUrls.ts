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

export const viewPatients = () => {
  return `adminAPI/viewPatients`;
};

export const viewPharmacists = () => {
  return `adminAPI/viewPharmacists`;
};

export const deletePatient = () => {
  return `adminAPI/deletePatient`;
};

export const deletePharmacist = () => {
  return `adminAPI/deletePharmacist`;
};

export const listAllMedicines = () => {
  return "getMedicines";
};

export const listAllMedicinalUses = () => {
  return "getMedicinalUses";
};

export const listAllOrders = () => {
  return "orderAPI/getOrders";
}

export const cancelOrder = (id: any) => {
  return `orderAPI/cancelOrder/${id}`;
}

export const acceptDoctor = () => {
  return `adminAPI/acceptDoctor`;
};

export const rejectDoctor = () => {
  return `adminAPI/rejectDoctor`;
};

export const viewAllContracts = () => {
  return `pharmacist/viewAllContracts`;
};

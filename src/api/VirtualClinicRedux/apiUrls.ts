export const listAllUsers = () => {
  return `userAPI/getUsers`;
};


export const listAllPrescriptions = () => {
  return "prescriptionAPI/getPrescriptions";
};

export const listSinglePrescription = (id: any) => {
  return `prescriptionAPI/getPrescription/${id}`;
};

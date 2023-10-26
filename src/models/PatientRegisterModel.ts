interface PatientRegisterModel {
    name: String;
    email: String;
    username: String;
    password: String;
    confirmPassword?: String;
    date_of_birth: String;
    gender: String;
    mobileNumber: String;
    healthRecords: String;
    emergencyContactName: String;
    emergenyContactNumber: String;
}

export default PatientRegisterModel;
import { StringLiteral } from "typescript";

interface PharmacistRegisterModel {
  name: String;
  email: String;
  username: String;
  password: String;
  confirmPassword: String;
  gender: String;
  specialty: String;
  date_of_birth: String;
  affiliation: String;
  educationalBackground: String;
  hourlyRate: String;
}

export default PharmacistRegisterModel;

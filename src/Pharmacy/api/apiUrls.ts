export const loginUrl = () => {
  return "userAPI/login";
};

export const registerUrl = () => {
  return "userAPI/registerUser";
};

export const refreshAccessTokenUrl = () => {
  return "authAPI/regenerateToken";
};

export const logoutUrl = () => {
  return "authAPI/logout";
};

export const forgetPasswordUrl = () => {
  return 'userAPI/forgetPassword';
}

export const verifyOtpUrl = () => {
  return 'userAPI/verifyOtp';
}

export const resetPasswordUrl = (type: any) => {
  return `${type}/resetPassword`;
}
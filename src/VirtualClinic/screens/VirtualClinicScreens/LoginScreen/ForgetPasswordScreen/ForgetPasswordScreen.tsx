import styles from "VirtualClinic/screens/VirtualClinicScreens/LoginScreen/ForgetPasswordScreen/ForgetPasswordScreen.module.css";
import { useState } from "react";
import { Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "VirtualClinic/redux/rootReducer";
import { forgetPasswordAction } from "VirtualClinic/redux/ForgetPassword/forgetPasswordAction";
import JellyLoader from "VirtualClinic/components/JellyLoader/JellyLoader";
import { verifyOtpAction } from "VirtualClinic/redux/ForgetPassword/VerifyOtp/verifyOtpAction";
import { resetPasswordAction } from "VirtualClinic/redux/ForgetPassword/ResetPassword/resetPasswordAction";
import { useNav } from "VirtualClinic/hooks/useNav";

const ForgetPasswordScreen = () => {
  const dispatch: any = useDispatch();

  const navigate = useNav();

  const [progress, setProgress] = useState(0);

  const { forgetPasswordLoading, forgetPasswordSuccess } = useSelector(
    (state: RootState) => state.forgetPasswordReducer
  );
  const { verifyOtpLoading, verifyOtpSuccess } = useSelector(
    (state: RootState) => state.verifyOtpReducer
  );
  const { resetPasswordLoading, resetPasswordSuccess } = useSelector(
    (state: RootState) => state.resetPasswordReducer
  );
  const { userType } = useSelector((state: RootState) => state.userReducer);

  /* Input Field States */
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  /* End Input Field States */

  const handleForgetPasswordClick = async () => {
    await dispatch(forgetPasswordAction({ email: email }));
    setProgress(1);
  };

  const handleOtpClick = async () => {
    await dispatch(verifyOtpAction({ otp: otp }));
    setProgress(2);
  };

  const handleResetClick = async () => {
    await dispatch(
      resetPasswordAction(userType?.toLowerCase(), { password: password })
    );
    navigate("/");
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-y-4">
      <h1>Reset Password</h1>
      {progress === 0 && (
        <>
          <Input
            placeholder="email@example.com"
            type="email"
            size="large"
            className="w-[20%]"
            onChange={(e: any) => setEmail(e.target.value)}
          />
          {forgetPasswordLoading ? (
            <JellyLoader />
          ) : (
            <button
              className="bg-[green]"
              color="red"
              onClick={handleForgetPasswordClick}
            >
              submit
            </button>
          )}
        </>
      )}
      {progress === 1 && (
        <>
          <p>An OTP should be sent to your email</p>
          <Input
            placeholder="Please Enter your otp"
            type="text"
            size="large"
            className="w-[20%]"
            onChange={(e: any) => setOtp(e.target.value)}
          />
          {verifyOtpLoading ? (
            <JellyLoader />
          ) : (
            <button className="bg-[green]" color="red" onClick={handleOtpClick}>
              verify
            </button>
          )}
        </>
      )}
      {progress === 2 && (
        <>
          <p>Enter your new password</p>
          <Input
            placeholder="Please Enter new password"
            type="password"
            size="large"
            className="w-[20%]"
            onChange={(e: any) => setPassword(e.target.value)}
          />
          {resetPasswordLoading ? (
            <JellyLoader />
          ) : (
            <button
              className="bg-[green]"
              color="red"
              onClick={handleResetClick}
            >
              reset password
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ForgetPasswordScreen;

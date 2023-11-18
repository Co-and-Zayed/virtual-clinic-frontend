import { NavigateOptions, useNavigate } from "react-router";

export const useNav = () => {
  const nav = useNavigate();

  // Function overload signatures
  function navigate(to: string, options?: NavigateOptions): void;
  function navigate(delta: number): void;

  // Actual implementation
  function navigate(arg1: string | number, options?: NavigateOptions): void {
    if (typeof arg1 === "string") {
      // Handle the case when a string is provided
      nav("/pharmacy" + arg1, options);
    } else {
      // Handle the case when a number is provided
      nav(arg1);
    }
  }

  return navigate;
};

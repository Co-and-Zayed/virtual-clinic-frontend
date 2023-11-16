import api from "Pharmacy/api";
import { registerUrl } from "Pharmacy/api/apiUrls";
import axios from "axios";
import { useFunctions as customFunctions } from "hooks/useFunctions";

export const registerService = async (data: any) => {
  const { handleUpload } = customFunctions();

  // Create a new object without the 'files' key
  const dataWithoutFiles = { ...data };
  delete dataWithoutFiles.files;

  const response = handleUpload({
    files: data.files,
    endpoint: registerUrl(),
    data: dataWithoutFiles,
  });

  return response;
};

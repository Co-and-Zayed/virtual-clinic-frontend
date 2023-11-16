import api from "VirtualClinic/api";
import { registerUrl } from "VirtualClinic/api/apiUrls";
import axios from "axios";
import { useFunctions as customFunctions } from "VirtualClinic/hooks/useFunctions";

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

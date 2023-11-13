import { useSelector } from "react-redux";
import { CSSProperties } from "react";
import { RootState } from "redux/rootReducer";
import JSZip from "jszip";

export const useFunctions = () => {
  // {files: any} for multiple files -> downloads them as a zip file
  // {file: any} for a single file -> downloads it as a single file
  const handleDownload = async (download: { files: any } | { file: any }) => {
    if ("files" in download) {
      const zip = new JSZip();

      // Fetch each file and add it to the zip
      await Promise.all(
        download.files.map(async (file: any, index: any) => {
          const response = await fetch(
            `${process.env.REACT_APP_BUCKET_URL}${file}`,
            {
              mode: `cors`,
            }
          );
          const blob = await response.blob();
          zip.file(`${index + 1}- ${file}`, blob);
        })
      );

      // Generate the zip file
      zip.generateAsync({ type: "blob" }).then((blob) => {
        // Create a temporary anchor element
        const link = document.createElement("a");

        // Set the download attribute with a unique name
        link.download = `El7a2ni--my_health_records@${new Date().getDate()}.zip`;

        // Create a URL for the blob and set it as the href
        link.href = URL.createObjectURL(blob);

        // Append the anchor element to the document
        document.body.appendChild(link);

        // Trigger a click event to initiate the download
        link.click();

        // Remove the anchor element from the document
        document.body.removeChild(link);
      });
    } else if ("file" in download) {
      // Create a temporary anchor element
      const link = document.createElement("a");
      link.href = `${process.env.REACT_APP_BUCKET_URL}${download.file}`;
      link.download = download.file;

      // For image files, add the download attribute to force download
      if (download.file.match(/\.(jpeg|jpg|gif|png)$/)) {
        link.setAttribute("target", "blank");
      }

      // Append the anchor element to the document
      document.body.appendChild(link);

      // Trigger a click event to initiate the download
      link.click();

      // Remove the anchor element from the document
      document.body.removeChild(link);
    }
  };
  return {
    handleDownload,
  };
};

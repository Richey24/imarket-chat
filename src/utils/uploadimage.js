import axios from "axios";

export const UseUploadImageUrl = () => {
  return async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await axios.post(
        "https://market-server.azurewebsites.net//image/upload",
        formData
      );
      if (response.status === 200 || response.status === 201) {
        // console.log("====>", response);
        return response.data.imagePath;
      }
    } catch (error) {
      console.log(error);
    }
  };
};

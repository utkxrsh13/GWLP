// import axios from "axios";

// export const getPrediction = async (inputData) => {
//   const response = await axios.post("http://127.0.0.1:5000/predict", inputData);
//   return response.data;
// };
// services/api.js
import axios from "axios";

export const getPrediction = async (data) => {
  const response = await axios.post("http://127.0.0.1:5000/predict", data); // or your actual endpoint
  return response.data;
};

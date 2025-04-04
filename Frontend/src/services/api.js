import axios from "axios";

export const getPrediction = async (inputData) => {
  const response = await axios.post("https://your-ml-api.com/predict", inputData);
  return response.data;
};
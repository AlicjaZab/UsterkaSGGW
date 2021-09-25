import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://10.0.2.2:8000/api", //address taken from here https://stackoverflow.com/questions/38418998/react-native-fetch-network-request-failed
});

export default apiClient;

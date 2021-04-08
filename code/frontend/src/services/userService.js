import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:5000/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getDoctorBoard = () => {
  return axios.get(API_URL + "doctor", { headers: authHeader() });
};

const getLaboratoryStaff = () => {
    return axios.get(API_URL + "laboratoryStaff", {
      headers: authHeader(),
    });
  };

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getPublicContent,
  getDoctorBoard,
  getLaboratoryStaff,
  getAdminBoard,
};

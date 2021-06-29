import axios from "axios";

const domain = process.env.REACT_APP_BACKEND_URL;

const headers = {
  "Content-type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

export default axios.create({
  baseURL: domain,
  headers: headers,
});

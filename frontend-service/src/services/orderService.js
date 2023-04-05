// All user related database operations can be defined here.

import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'


export const getApiDataService = (api) => {
  return new Promise((resolve, reject) => {
    try {
      axios
      .get(api,{
        headers: {
          "Authorization": `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject("Error in  axios!");
      });
    } catch (error) {
      reject(SYSTEM_ERROR);
    }
  });
};


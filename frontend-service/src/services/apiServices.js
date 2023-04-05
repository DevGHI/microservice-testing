// All user related database operations can be defined here.

import { HandleLogout } from "utils/Logout";
import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from "axios";
import { toast } from "react-toastify";

export const getApiDataService = (api) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(api, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
          if (
            error.response.status === 401 ||
            error.response.data.message === "Unauthenticated."
          ) {
            HandleLogout();
            return;
          }
        });
    } catch (error) {}
  });
};
export const putApiDataService = (api, data) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(api, data, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          resolve(res.data);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
          if (
            error.response.status === 401 ||
            error.response.data.message === "Unauthenticated."
          ) {
            HandleLogout();
            return;
          }
        });
    } catch (error) {
      reject(SYSTEM_ERROR);
    }
  });
};
export const postApiDataService = (api, data) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(api, data, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          resolve(res.data);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
          if (
            error.response.status === 401 ||
            error.response.data.message === "Unauthenticated."
          ) {
            HandleLogout();
            return;
          }
          reject(error)
        });
    } catch (error) {
      reject(SYSTEM_ERROR);
    }
  });
};

export const postApiImageUploadService = (api, data) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(api, data, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          toast.success(res.data.message);
          resolve(res.data);
        })
        .catch((error) => {
          // console.log("H")
          // console.log(error.response.status)
          toast.error(error?.response?.data?.message);
          if (
            error.response.status === 401 ||
            error.response.data.message === "Unauthenticated."
          ) {
            HandleLogout();
            return;
          }
        });
    } catch (error) {
      reject(SYSTEM_ERROR);
    }
  });
};
// export const postApiImageUploadService = (api, data) => {
//   return new Promise((resolve, reject) => {
//     try {
//       axios
//         .post(api, data, {
//           headers: {
//             Authorization: `${localStorage.getItem("token")}`,
//             Accept: "application/json",
//             "Content-Type": "multipart/form-data",
//           },
//         })
//         .then((res) => {
//           toast.success(res.data.message);
//           resolve(res.data);
//         })
//         .catch((error) => {
//           toast.error(error?.response?.data?.message)
//           if (
//             error.response.status === 401 ||
//             error.response.data.message === "Unauthenticated."
//           ) {
//             HandleLogout();
//             return;
//           }
//         });
//     } catch (error) {
//       reject(SYSTEM_ERROR);
//     }
//   });
// };

export const deleteApiDataService = (api, data) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .delete(api, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
          data: data,
        })
        .then((res) => {
          toast.success(res.data.message);
          resolve(res.data);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
          if (
            error.response.status === 401 ||
            error.response.data.message === "Unauthenticated."
          ) {
            HandleLogout();
            return;
          }
        });
    } catch (error) {
      reject(SYSTEM_ERROR);
    }
  });
}

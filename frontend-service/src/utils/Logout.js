function refreshPage() {
  window.location.assign("/admin/login");
  window.location.reload(false);
}
export const HandleLogout = () => {
  localStorage.clear();
  refreshPage();
};

//   try {
//     const response = await axios.request(PostMethod(`api/logout`));
//     if (response.data.status === "success") {
//       localStorage.clear();
//       refreshPage();
//       return;
//     }
//   } catch (error) {
//     if (
//       error.response.status === 401 ||
//       error.response.data.message === "Unauthenticated."
//     ) {
//       localStorage.clear();
//       refreshPage();
//       return;
//     }
//   }

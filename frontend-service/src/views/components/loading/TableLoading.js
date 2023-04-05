import React from "react";
import "./loading.css";
const TableLoading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
      }}
    >
      <div class="lds-facebook">
        <div></div>
        <div></div>
        <div></div>{" "}
      </div>
    </div>
  );
};

export default TableLoading;

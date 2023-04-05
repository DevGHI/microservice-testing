import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
} from "reactstrap";
import { postApiDataService, putApiDataService } from "../../../services/apiServices";
import { USER_BAN_WITH_TIME_API, USER_UPDATE_API } from "../../../services/CONSTANTS";
import axios from "axios";
import { toast } from "react-toastify";

function BanModal(props) {
  // Initialize state with default values for accountName, accountNo, and status

  const [ban, setBan] = useState(true);
  const [changePassword, setChangePassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const [status, setStatus] = useState("");
  const [chDate, setchDate] = useState("");

  // Handler functions for updating account information

  const changePasswordhandler = (e) => {
    setChangePassword(e.target.value);
  };

  const passChangeConfirm = (e) => {
    e.preventDefault();
    if (changePassword === "") {
      toast.error("please enter password for customer`s password");
    } else {
      let data = {
        user_id: props?.item?.id,
        new_password: changePassword,
      };
      props.passChangeHandler(data).then((res) => {
        if (res.status === "success") {
          props.onClose();
          setIsLoading(false);
        }
      });
    }
  };
  const addDays = (date, days) => {
    const dateCopy = new Date(date);
    dateCopy.setDate(date.getDate() + days);
    return dateCopy;
  };
  const banConfirmHandler1week = () => {
    setIsLoading(true);
    console.log("1 week Banned");
    let date = new Date();
    let add = addDays(date, 7);
    let year = add.getFullYear();
    let month = add.getMonth() + 1;
    let day = add.getDate();
    let time = add.toLocaleTimeString("it-CH");
    // let hour = add.getHours();
    // let minute = add.getMinute();
    // let second = add.getSecond();
    let oneWeekAdd;
    if (month > 9) {
      oneWeekAdd = year + "-" + month + "-" + day + " " + time;
    } else if (day < 10) {
      oneWeekAdd = year + "-" + "0" + month + "-" + "0" + day + " " + time;
    } else {
      oneWeekAdd = year + "-" + "0" + month + "-" + day + " " + time;
    }
    let data = { user_id: props.item.id, banned_till: oneWeekAdd };

    // console.log("add days fun", data);

    postApiDataService(USER_BAN_WITH_TIME_API, data).then((res) => {
      if (res.status === "success" || res.data.status === "success") {
        props.onClose();
        setIsLoading(false);
        setStatus("");
        props.setActive(!props.active);
        setchDate("");
      }
    });
  };
  const banConfirmHandler2week = () => {
    setIsLoading(true);
    console.log("2 week Banned");
    let date = new Date();
    let add = addDays(date, 14);
    let year = add.getFullYear();
    let month = add.getMonth() + 1;
    let day = add.getDate();
    let time = add.toLocaleTimeString("it-CH");
    // let hour = add.getHours();
    // let minute = add.getMinute();
    // let second = add.getSecond();
    let oneWeekAdd;
    if (month < 9) {
      oneWeekAdd = year + "-" + "0" + month + "-" + day + " " + time;
    } else {
      oneWeekAdd = year + "-" + month + "-" + day + " " + time;
    }
    let data = { user_id: props.item.id, banned_till: oneWeekAdd };
    // console.log("add days fun", data);

    postApiDataService(USER_BAN_WITH_TIME_API, data).then((res) => {
      if (res.status === "success" || res.data.status === "success") {
        props.onClose();
        setIsLoading(false);
        setStatus("");
        props.setActive(!props.active);
        setchDate("");
      }
    });
  };
  const banConfirmHandler1month = () => {
    setIsLoading(true);
    console.log("1 month Banned");
    let date = new Date();
    let add = addDays(date, 0);
    let year = add.getFullYear();
    let month = add.getMonth() + 2;
    let day = add.getDate();
    let time = add.toLocaleTimeString("it-CH");
    // let hour = add.getHours();
    // let minute = add.getMinute();
    // let second = add.getSecond();
    let oneWeekAdd;
    if (month > 9) {
      oneWeekAdd = year + "-" + month + "-" + day + " " + time;
    } else if (day <= 9) {
      oneWeekAdd = year + "-" + "0" + month + "-" + "0" + day + " " + time;
    } else {
      oneWeekAdd = year + "-" + "0" + month + "-" + day + " " + time;
    }
    let data = { user_id: props.item.id, banned_till: oneWeekAdd };

    // console.log("add days fun", data);

    postApiDataService(USER_BAN_WITH_TIME_API, data)
      .then((res) => {
        if (res.status === "success" || res.data.status === "success") {
          props.onClose();
          setIsLoading(false);
          setStatus("");
          props.setActive(!props.active);
          setchDate("");
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const ban1week = () => {
    setConfirm(true);
    setOne(true);
    setTwo(false);
    setThree(false);
  };
  const ban2week = () => {
    setConfirm(true);
    setOne(false);
    setTwo(true);
    setThree(false);
  };
  const ban1month = () => {
    setConfirm(true);
    setOne(false);
    setTwo(false);
    setThree(true);
  };

  const filterDate = (status) => {
    if (status === "1w") {
      let date = new Date();
      let add = addDays(date, 7);
      let year = add.getFullYear();
      let month = add.getMonth() + 1;
      let day = add.getDate();
      let time = add.toLocaleTimeString("it-CH");
      // let hour = add.getHours();
      // let minute = add.getMinute();
      // let second = add.getSecond();
      let oneWeekAdd;
      if (month > 9) {
        oneWeekAdd = year + "-" + month + "-" + day + " " + time;
      } else if (day < 10) {
        oneWeekAdd = year + "-" + "0" + month + "-" + "0" + day + " " + time;
      } else {
        oneWeekAdd = year + "-" + "0" + month + "-" + day + " " + time;
      }
      setchDate(oneWeekAdd);
      console.log(chDate);
    } else if (status === "2w") {
      let date = new Date();
      let add = addDays(date, 14);
      let year = add.getFullYear();
      let month = add.getMonth() + 1;
      let day = add.getDate();
      let time = add.toLocaleTimeString("it-CH");
      // let hour = add.getHours();
      // let minute = add.getMinute();
      // let second = add.getSecond();
      let oneWeekAdd;
      if (month < 9) {
        oneWeekAdd = year + "-" + "0" + month + "-" + day + " " + time;
      } else {
        oneWeekAdd = year + "-" + month + "-" + day + " " + time;
      }

      // console.log("add days fun", data);
      setchDate(oneWeekAdd);
      console.log(chDate);
    } else if (status === "1m") {
      let date = new Date();
      let add = addDays(date, 0);
      let year = add.getFullYear();
      let month = add.getMonth() + 2;
      let day = add.getDate();
      let time = add.toLocaleTimeString("it-CH");
      // let hour = add.getHours();
      // let minute = add.getMinute();
      // let second = add.getSecond();
      let oneWeekAdd;
      if (month > 9) {
        oneWeekAdd = year + "-" + month + "-" + day + " " + time;
      } else if (day <= 9) {
        oneWeekAdd = year + "-" + "0" + month + "-" + "0" + day + " " + time;
      } else {
        oneWeekAdd = year + "-" + "0" + month + "-" + day + " " + time;
      }

      // console.log("add days fun", data);
      setchDate(oneWeekAdd);
      console.log(chDate);
    } else if (status === "1m") {
      setchDate(null);
    } else {
      setchDate("");
    }
  };

  const banPermanent = () => {
    setIsLoading(true);
    let data = { status: "disable" };
    putApiDataService(USER_UPDATE_API(props?.item?.id), data).then((res) => {
      if (res.status === "success" || res.data.status === "success") {
        props.onClose();
        setIsLoading(false);
        props.setActive(!props.active);
      }
    });
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
    filterDate();
  };

  const unBan = () => {
    setIsLoading(true);
    let data = { status: "active" };
    putApiDataService(USER_UPDATE_API(props?.item?.id), data).then((res) => {
      if (res.status === "success" || res.data.status === "success") {
        props.onClose();
        setIsLoading(false);
        props.setActive(!props.active);
      }
    });
  };

  const banConfirmHandler = () => {
    if (status === "1w") {
      banConfirmHandler1week();
    } else if (status === "2w") {
      banConfirmHandler2week();
    } else if (status === "1m") {
      banConfirmHandler1month();
    } else if (status === "perm") {
      banPermanent();
    } else {
      unBan();
    }
  };

  // console.log(props.item);

  return (
    <Modal isOpen={props.modal} toggle={props.onClose}>
      <ModalHeader toggle={props.onClose}>User {props?.item?.name} </ModalHeader>
      <ModalBody>
        <div className={`m-3`}>
          <h3>Ban for</h3>{" "}
          <Input
            className="mx-2"
            type="select"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              filterDate(e.target.value);
              console.log("asdfasdgs", e.target.value);
            }}>
            <option value="null">
              {props.item?.status === "disable" && props.item.banned_till === null
                ? "Permanent Ban"
                : props.item.banned_till !== null
                ? "Till " + new Date(props.item.banned_till).toLocaleDateString("fr-CA")
                : "Active"}
              {/* {new Date(props.item.banned_till).toLocaleDateString() || props.item?.status} */}
            </option>
            {/* {props.item?.status === "disable" ? (
              <>
                <option value="" disabled>
                  Can't Perform This Action
                </option>
              </>
            ) : ( */}
            <>
              <option value="1w"> 1 Week </option>
              <option value="2w"> 2 Week </option>
              <option value="1m"> 1 Month </option>
              <option value="perm">Permanent</option>
              {props.item.status !== "active" ? <option value="active">Active</option> : null}
            </>
            {/* )} */}
          </Input>
          {chDate !== "" && chDate !== null && (
            <p className="m-2">
              User will active at <span>{chDate}</span>
            </p>
          )}
          {chDate === "" && props.item.status === "active" && <p className="m-2">User Active</p>}
          {chDate === null && <p className="m-2">User Will Ban Forever</p>}
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          className="btn btn-default"
          onClick={() => {
            props.onClose();
            setConfirm(false);
            setBan(false);
            setchDate("");
            setStatus();
          }}>
          Close
        </button>
        {/* {props.item.status === "disable" ? null : ( */}
        <button
          onClick={banConfirmHandler}
          disable={isLoading ? true : false}
          className={`btn ${status === "active" ? "btn-success" : "btn-danger"}`}>
          {isLoading ? "Loading..." : status === "active" ? "Active" : "Ban"}
        </button>
        {/* )} */}
      </ModalFooter>
    </Modal>
  );
}

export default BanModal;

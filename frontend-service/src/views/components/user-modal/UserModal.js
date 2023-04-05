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
import { postApiDataService } from "../../../services/apiServices";
import { USER_BAN_WITH_TIME_API } from "../../../services/CONSTANTS";
import axios from "axios";
import { toast } from "react-toastify";

function UserModal(props) {
  // Initialize state with default values for accountName, accountNo, and status
  const [password, setPassword] = useState(true);
  const [ban, setBan] = useState(false);
  const [changePassword, setChangePassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass, setShowPass] = useState(false);

  // Handler functions for updating account information

  const passHandler = () => {
    setPassword(true);
    setBan(false);
  };

  const banHandler = () => {
    setPassword(false);
    setBan(true);
  };

  const changePasswordhandler = (e) => {
    setChangePassword(e.target.value);
  };

  const handleComfirmPass = (e) => {
    setConfirmPass(e.target.value);
    // console.log(e);
    if (e.keycode === "Enter") {
      passChangeConfirm();
    }
  };

  const passChangeConfirm = (e) => {
    e.preventDefault();

    if (changePassword === "") {
      toast.error("please enter password for customer`s password");
      return;
    } else if (changePassword !== confirmPass) {
      toast.error("please enter Correct password");
      return;
    } else {
      let data = {
        user_id: props?.item?.id,
        new_password: changePassword,
      };
      props.passChangeHandler(data);
    }
  };

  return (
    <Modal isOpen={props.modal} toggle={props.onClose}>
      <ModalHeader toggle={props.onClose}>
        {" "}
        Change Password For User : {props?.item?.name}{" "}
      </ModalHeader>
      <ModalBody>
        {password && (
          <Form>
            {/* <p className={`m-3`}>
              Change Password For <strong>{props?.item?.name}</strong>
            </p> */}
            <div className={`mb-3 d-flex`}>
              <Input
                type={showPass ? "text" : "password"}
                placeholder="New Password"
                onChange={changePasswordhandler}
              />
            </div>
            <FormGroup
              className={
                confirmPass === ""
                  ? ""
                  : changePassword === confirmPass
                  ? "has-success"
                  : "has-danger"
              }>
              {/* <Label for="conPass">Confirm Password</Label> */}
              <Input
                type={showPass ? "text" : "password"}
                className={
                  confirmPass === ""
                    ? ""
                    : changePassword === confirmPass
                    ? "is-valid"
                    : "is-invalid"
                }
                name="conPass"
                placeholder="Confirm Password"
                id="conPass"
                onChange={handleComfirmPass}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    passChangeConfirm(e);
                  }
                }}
              />
            </FormGroup>
            <FormGroup className="m-4">
              {/* <Label for="conPass">Confirm Password</Label> */}
              <Input
                type="checkbox"
                name="showPass"
                placeholder=""
                id="showPass"
                onChange={() => setShowPass(true)}
              />
              <Label htmlFor="showPass">show password</Label>
            </FormGroup>
          </Form>
        )}
      </ModalBody>
      <ModalFooter>
        <button
          className="btn btn-default"
          onClick={() => {
            props.onClose();
            setConfirm(false);
            setPassword(true);
          }}>
          Close
        </button>
        {props.isBtnLoading ? (
          <button className="btn btn-success" disabled>
            Loading...
          </button>
        ) : (
          <button className={`btn btn-success`} onClick={passChangeConfirm}>
            Confirm
          </button>
        )}
      </ModalFooter>
    </Modal>
  );
}

export default UserModal;

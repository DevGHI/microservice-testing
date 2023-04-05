import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { toast } from "react-toastify";

function CreateUserModal(props) {
  // Initialize state with default values for accountName, accountNo, and status
  const [accountName, setAccountName] = useState(null);
  const [accountNo, setAccountNo] = useState(null);
  const [name, setName] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  // Handler functions for updating account information
  const handleAccountNameChange = (event) => {
    setAccountName(event.target.value);
  };
  // useEffect(() => {
  //   getApiDataService(SUB_CATEGORY_API(mainStatus)).then((res) => {
  //     // console.log(res.data, "response");
  //     setStatus(res.data);
  //   });
  // }, [mainStatus]);

  const handleAccountNoChange = (event) => {
    setAccountNo(event.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleComfirmPass = (e) => {
    setConfirmPass(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name !== confirmPass) {
      toast.error("Please Enter Correct Password");
      return;
    } else {
      setIsLoading(true);
      let data = {
        name: accountName,
        phone: accountNo,
        password: name,
        role: "CS",
      };
      props.onSubmit(data);
      if (props.modal === false) {
        setShowPass(false);
        setIsLoading(false);
      }
    }
  };

  return (
    <Modal isOpen={props.modal} toggle={props.onClose}>
      <ModalHeader toggle={props.onClose}>Create CS </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="title">Name</Label>
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="Name"
              onChange={handleAccountNameChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="phone">Phone</Label>
            <Input
              type="text"
              name="phone"
              placeholder="Phone"
              id="phone"
              onChange={handleAccountNoChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Password"
              id="password"
              onChange={handleNameChange}
            />
          </FormGroup>
          <FormGroup
            className={
              confirmPass === "" ? "" : name === confirmPass ? "has-success" : "has-danger"
            }>
            <Label for="conPass">Confirm Password</Label>
            <Input
              type={showPass ? "text" : "password"}
              className={confirmPass === "" ? "" : name === confirmPass ? "is-valid" : "is-invalid"}
              name="conPass"
              placeholder="Confirm Password"
              id="conPass"
              onChange={handleComfirmPass}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(e);
                }
              }}
            />
          </FormGroup>
          <FormGroup className="m-4">
            <Input
              type="checkbox"
              name="conPass"
              placeholder="Confirm Password"
              id="showPass"
              onChange={() => setShowPass(!showPass)}
            />
            <Label for="showPass">show password</Label>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-default" onClick={props.onClose}>
          No
        </button>
        {isLoading == false && (
          <button className="btn btn-success" onClick={handleSubmit}>
            Save
          </button>
        )}
        {isLoading == true && (
          <button className="btn btn-success" disabled="disabled">
            Uploading...
          </button>
        )}
      </ModalFooter>
    </Modal>
  );
}

export default CreateUserModal;

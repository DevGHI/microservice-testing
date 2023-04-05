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
  Textarea,
} from "reactstrap";
import { getApiDataService } from "../../../services/apiServices";
import { ANNOUNCEMENT_API } from "../../../services/CONSTANTS";

function CreateAnnouncementModal(props) {
  // Initialize state with default values for accountName, accountNo, and status
  const [accountName, setAccountName] = useState(null);
  const [accountNo, setAccountNo] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  // Handler functions for updating account information
  const handleAccountNameChange = (event) => {
    setAccountName(event.target.value);
  };

  const handleAccountNoChange = (event) => {
    setAccountNo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    let data = {
      title: accountName,
      description: accountNo,
    };
    props.onSubmit(data);
  };

  return (
    <Modal isOpen={true} toggle={props.onClose}>
      <ModalHeader toggle={props.onClose}>Create Message </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input type="text" name="title" id="title" onChange={handleAccountNameChange} />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              style={{ height: "180px" }}
              onChange={handleAccountNoChange}
            />
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

export default CreateAnnouncementModal;

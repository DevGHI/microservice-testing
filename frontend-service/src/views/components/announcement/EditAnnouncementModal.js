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

function EditAnnouncementModal(props) {
  // Initialize state with default values for accountName, accountNo, and status
  const [id, setId] = useState(props?.item?.id);
  const [accountName, setAccountName] = useState(props?.item?.title);
  const [accountNo, setAccountNo] = useState(props?.item?.description);
  const [status, setStatus] = useState(props?.item?.status);

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
    <Modal isOpen={true}  toggle={props.onClose}>
      <ModalHeader  toggle={props.onClose}>Edit Message </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              id="title"
              value={accountName}
              onChange={handleAccountNameChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              style={{ height: "180px" }}
              value={accountNo}
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

export default EditAnnouncementModal;

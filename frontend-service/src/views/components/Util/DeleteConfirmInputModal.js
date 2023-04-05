// reactstrap components
import {
  Input,
  FormGroup,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Label,
} from "reactstrap";
import { useState } from "react";
import { toast } from "react-toastify";

const DeleteConfirmInputModal = ({ modal, toggle, id, handleDelete }) => {
  const [remark, setRemark] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const comfirmHandler = (e) => {
    console.log("DeleteId", id);
    if (remark == "") {
      toast.error("Please enter remark");
    } else {
      setIsLoading(true);
      handleDelete(e, id, "rejected", remark);
      // setRemark("");
      toggle();
    }
  };
  const toggleHandler = () => {
    setRemark("");
    console.log("toggle close");
    toggle();
  };
  return (
    <Modal isOpen={modal} toggle={toggleHandler}>
      <ModalHeader toggle={toggleHandler}>
        <h2>Are you sure?</h2>
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="exampleText">Enter Remark</Label>
          <Input
            id="exampleText"
            style={{ height: "100px" }}
            name="text"
            type="textarea"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>{" "}
        {isLoading == false && (
          <button className="btn btn-success" onClick={comfirmHandler}>
            Confirm
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
};

export default DeleteConfirmInputModal;

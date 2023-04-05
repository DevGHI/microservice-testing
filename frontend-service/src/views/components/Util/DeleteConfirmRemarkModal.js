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
  
  const DeleteConfirmRemarkModal = (props) => {
    const [remark, setRemark] = useState("");
    const isLoading=props.isLoading;
  
    const comfirmHandler = (e) => {
      if (remark == "") {
        toast.error("Please enter remark");
        return;
      }
      let data = {
        id: props?.item?.id,
        status: "rejected",
        remark: remark,
      }
      props.onDelete(data);
    };

    
    return (
      <Modal isOpen={true} toggle={props.onClose}>
        <ModalHeader toggle={props.onClose}>
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
          <Button color="secondary" onClick={props.onClose}>
            Cancel
          </Button>{" "}
          {isLoading == false && (
            <button className="btn btn-success" onClick={comfirmHandler}>
              Confirm
            </button>
          )}
          {isLoading == true && (
            <button className="btn btn-success" disabled="disabled">
              Progressing...
            </button>
          )}
        </ModalFooter>
      </Modal>
    );
  };
  
  export default DeleteConfirmRemarkModal;
  
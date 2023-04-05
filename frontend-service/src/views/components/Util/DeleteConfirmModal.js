import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function DeleteConfirmModal(props) {
  let loading=props.isLoading;
  console.log("loading",loading);
  return (
    <Modal isOpen={true}>
      <ModalHeader>Delete</ModalHeader>
      <ModalBody>Are you sure you want to delete this item?</ModalBody>
      <ModalFooter>
        <button className="btn btn-default" onClick={props.onClose}>No</button>
        {
          props.isLoading==false &&
          <button className="btn btn-danger" onClick={props.onDelete}>Yes</button>
        }
        {
          props.isLoading==true &&
          <button className="btn btn-danger" disabled="disabled">Deleting...</button>
        }
      </ModalFooter>
    </Modal>
  );
}

export default DeleteConfirmModal;

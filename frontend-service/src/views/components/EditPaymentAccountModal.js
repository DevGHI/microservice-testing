import React, { useState } from "react";

function EditPaymentAccountModal(props) {
  // Initialize state with default values for accountName, accountNo, and status
  const [id, setId] = useState(props.id);
  const [accountName, setAccountName] = useState(props.accountName);
  const [accountNo, setAccountNo] = useState(props.accountNo);
  const [status, setStatus] = useState(props.status);

  // Handler functions for updating account information
  const handleAccountNameChange = (event) => {
    setAccountName(event.target.value);
  };

  const handleAccountNoChange = (event) => {
    setAccountNo(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call an API to update account information
    fetch("api/payment-accounts/"+id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        account_name: accountName,
        account_no: accountNo,
        status: status,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Close the modal and pass updated account information to parent component
        props.onClose(data.accountName, data.accountNo, data.status);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Account Information</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Account Name:
            <input type="text" value={accountName} onChange={handleAccountNameChange} />
          </label>
          <label>
            Account No:
            <input type="text" value={accountNo} onChange={handleAccountNoChange} />
          </label>
          <label>
            Status:
            <select value={status} onChange={handleStatusChange}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label>
          <button type="submit">Save</button>
          <button onClick={props.onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default EditPaymentAccountModal;

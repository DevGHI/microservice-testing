import React, { useState, useEffect } from "react";
import Header from "components/Headers/Header.js";
import { useHistory } from "react-router-dom";
import { Card, CardHeader, Table, Container, Row } from "reactstrap";
import {
  ANNOUNCEMENT_API,
  UPDATE_ANNOUNCEMENT_API,
  DELETE_ANNOUNCEMENT_API,
} from "../../../services/CONSTANTS";
import {
  getApiDataService,
  deleteApiDataService,
  putApiDataService,
  postApiDataService,
} from "../../../services/apiServices";
import DeleteConfirmModal from "../Util/DeleteConfirmModal";
import CreateAnnouncementModal from "./CreateAnnouncementModal";
import EditAnnouncementModal from "./EditAnnouncementModal";

function Announcement() {
  const history = useHistory();
  const [announcement, setannouncement] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [item, setitem] = useState(null);

  useEffect(() => {
    fetchannouncement();
  }, []);

  const handleCreateClick = () => {
    console.log("Create item");
    setShowCreateModal(true);
  };

  const handleDeleteClick = (item) => {
    console.log("Delete item", item);
    setitem(item);
    setShowDeleteModal(true);
  };

  const handleEditClick = (item) => {
    console.log("Edit item", item);
    setitem(item);
    setShowEditModal(true);
  };

  const fetchannouncement = () => {
    setIsLoading(true);
    getApiDataService(ANNOUNCEMENT_API)
      .then((res) => {
        setannouncement(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error in useEffect!", err);
        setIsLoading(false);
        setannouncement([]);
      });
    return () => {
      console.log("axios cleanup.");
    };
  };

  const handleDeleteConfirm = () => {
    setIsLoading(true);
    console.log("Deleting item", item.id);
    deleteApiDataService(DELETE_ANNOUNCEMENT_API(item.id))
      .then((res) => {
        console.log("Delete success", res);
        setShowDeleteModal(false);
        fetchannouncement();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error in delete!", err);
        setIsLoading(false);
      });
  };

  const handleModalBoxCancel = () => {
    setShowDeleteModal(false);
    setShowEditModal(false);
    setShowCreateModal(false);
  };

  const handleUpdateSubmit = (data) => {
    console.log("data", data);
    setIsLoading(true);
    putApiDataService(UPDATE_ANNOUNCEMENT_API(item?.id), data)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setShowEditModal(false);
        fetchannouncement();
      })
      .catch((err) => {
        console.log("Error in handleUpdateSubmit!", err);
        setIsLoading(false);
      });
  };

  const handleCreateSubmit = (data) => {
    console.log("data", data);
    setIsLoading(true);
    postApiDataService(ANNOUNCEMENT_API, data)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setShowCreateModal(false);
        fetchannouncement();
      })
      .catch((err) => {
        console.log("Error in handleCreateSubmit!", err);
        setIsLoading(false);
      });
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Messages</h3>
                  </div>
                  <div className="col text-right">
                    <button onClick={() => handleCreateClick()} className="btn btn-sm btn-primary">
                      Create
                    </button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" striped responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col" colSpan="2">
                      Description
                    </th>

                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {announcement.map((item, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <th scope="row">
                        <span>{item?.title}</span>
                      </th>
                      <td colSpan="2">
                        <span>{item?.description}</span>
                      </td>

                      <td className="text-right">
                        <div className="row">
                          <div className="col">
                            <button
                              className="btn btn-outline-success btn-sm"
                              onClick={() => handleEditClick(item)}>
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDeleteClick(item)}>
                              Delete
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
      {showDeleteModal && (
        <DeleteConfirmModal
          item={item}
          isLoading={isLoading}
          onDelete={handleDeleteConfirm}
          onClose={handleModalBoxCancel}
        />
      )}
      {showEditModal && (
        <EditAnnouncementModal
          item={item}
          onClose={handleModalBoxCancel}
          onSubmit={handleUpdateSubmit}
        />
      )}
      {showCreateModal && (
        <CreateAnnouncementModal onClose={handleModalBoxCancel} onSubmit={handleCreateSubmit} />
      )}
    </>
  );
}

export default Announcement;

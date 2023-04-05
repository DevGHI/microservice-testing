import React, { useState, useEffect } from "react";
import Header from "components/Headers/Header.js";
import { useHistory } from "react-router-dom";
import { Card, CardHeader, Table, Container, Row } from "reactstrap";
import { BANNER_IMAGE_API, DELETE_BANNER_IMAGE_API } from "../../services/CONSTANTS";
import {
  getApiDataService,
  deleteApiDataService,
  postApiImageUploadService,
} from "../../services/apiServices";
import DeleteConfirmModal from "./Util/DeleteConfirmModal";
import CreateBannerModal from "./banner/CreateBannerImageModal";

function BannerImage() {
  const history = useHistory();
  const [announcement, setannouncement] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [item, setitem] = useState(null);

  useEffect(() => {
    fetchAppGuide();
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

  const fetchAppGuide = () => {
    setIsLoading(true);
    getApiDataService(BANNER_IMAGE_API)
      .then((res) => {
        setannouncement(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error in useEffect!", err);
        setIsLoading(false);
        setannouncement(null);
      });
    return () => {
      console.log("axios cleanup.");
    };
  };

  const handleDeleteConfirm = () => {
    setIsLoading(true);
    console.log("Deleting item", item.id);
    deleteApiDataService(DELETE_BANNER_IMAGE_API(item.id))
      .then((res) => {
        console.log("Delete success", res);
        setShowDeleteModal(false);
        fetchAppGuide();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error in delete!", err);
        setIsLoading(false);
      });
  };

  const handleModalBoxCancel = () => {
    setShowDeleteModal(false);
    setShowCreateModal(false);
  };

  const handleCreateSubmit = (data) => {
    console.log("data", data);
    setIsLoading(true);
    postApiImageUploadService(BANNER_IMAGE_API, data)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setShowCreateModal(false);
        fetchAppGuide();
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
                    <h3 className="mb-0">Banner Image</h3>
                  </div>
                  <div className="col text-right">
                    <button onClick={() => handleCreateClick()} className="btn btn-sm btn-primary">
                      Create
                    </button>
                  </div>
                </Row>
              </CardHeader>
              {announcement?.length !== 0 ? (
                <>
                  {announcement?.map((item, index) => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        margin: "5px",
                      }}>
                      <img
                        key={index}
                        src={item?.image}
                        alt=""
                        style={{ width: "300px ", height: "150px", borderRadius: "5px" }}
                      />
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteClick(item)}>
                        Delete
                      </button>{" "}
                    </div>
                  ))}
                </>
              ) : null}
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
      {showCreateModal && (
        <CreateBannerModal onClose={handleModalBoxCancel} onSubmit={handleCreateSubmit} />
      )}
    </>
  );
}

export default BannerImage;

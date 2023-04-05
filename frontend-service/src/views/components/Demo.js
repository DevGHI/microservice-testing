// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    UncontrolledTooltip,
  } from "reactstrap";
  import { useState, useEffect } from "react";
  // core components
  import Header from "components/Headers/Header.js";
  import { useHistory } from "react-router-dom";
  
  //data
  import { USERS_API } from "../../services/CONSTANTS";
  import { getApiDataService } from "../../services/apiServices";
  
  const Demo = () => {
    const history = useHistory();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      setIsLoading(true);
      getApiDataService(USERS_API)
        .then((res) => {
          console.log("res.data=", res.data);
          setUsers(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("Error in useEffect!", err);
          setIsLoading(false);
          setUsers([]);
        });
      return () => {
        console.log("axios cleanup.");
      };
    }, []);
  
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
                  <h3 className="mb-0">User Lists</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">UserCode</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email(or)Phone</th>
                      <th scope="col">MMK</th>
                      <th scope="col">Bath</th>
                      <th scope="col">Ban Status</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    
                    {users.map((user, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{user?.userCode}</td>
                        <th scope="row">
                          <Media className="align-items-center">
                            <a
                              className="avatar rounded-circle mr-3"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <img
                                alt="..."
                                // src={user?.thumbnail}
                                src="https://www.seekpng.com/png/detail/202-2024994_profile-icon-profile-logo-no-background.png"
                                style={{ width: "60px" }}
                              />
                            </a>
                            <Media>
                              <span className="mb-0 text-sm">{user?.name}</span>
                            </Media>
                          </Media>
                        </th>            
                        <td>{user?.email?user?.email:user?.phone}</td>
                        <td>100000</td>
                        <td>100000</td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            {user?.bannedTill ? (
                              <i className="bg-danger" />
                            ) : (
                              <i className="bg-success" />
                            )}
                            {user?.bannedTill?'Banned Till '+user?.bannedTill:'Active'}
                          </Badge>
                        </td>
                        <td className="text-right">
                          <div className="row">
                            <div className="col">
                              <button
                                className="btn btn-outline-success"
                                onClick={() => {
                                  history.push("/admin/edit-user/1");
                                }}
                              >
                                Edit
                              </button>
                              <button className="btn btn-info">View</button>
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
      </>
    );
  };
  
  export default Demo;
  
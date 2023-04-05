/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import axios from "axios";
import { type } from "jquery";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Alert,
} from "reactstrap";
import ButtonLoading from "views/components/ButtonLoading";
const Login = () => {
  const email = useRef("");
  const password = useRef("");
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);
  const history = useHistory();
  const [errors, setErrors] = useState("");
  const { REACT_APP_API_URL } = process.env;
  const [loading, setLoading] = useState(false);
  const handleSignIn = (e) => {
    console.log("fjiejfwioe");
    e.preventDefault();
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    if (emailValue === "" && passwordValue === "") {
      alert("Please fill all the fields");
      return;
    }
    setLoading(true);
    axios
      .post(`${REACT_APP_API_URL}users/login`, {
        email: emailValue,
        password: passwordValue,
      })
      .then((res) => {
        if (res.data.status === "success") {
          setLoading(false);
          console.log('data',res.data)
          const data = res.data.data;
          const user = data.user;

          delete user.remember_me_token;
          delete user.created_at;
          delete user.updated_at;

          const token = data.token.type+" "+data.token.token;
          localStorage.setItem("token", token);
          localStorage.setItem("user", user);
            console.log("admin");
            window.location.assign("admin/posts");
            window.location.reload(false);
            // history.push("/dashboard/index");
        } else {
          setErrors(res.data.message);
          setVisible(true);
          setLoading(false);
        }
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        setErrors(
          typeof err.response.data.message === "object"
            ? err.response.data.message.errors[0].message
            : err.response.data.message
        );
        setVisible(true);
      });
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="border-0 shadow bg-secondary">
          {/* <CardHeader className="pb-5 bg-transparent">
            <div className="mt-2 text-center text-muted"></div>
            <div className="text-center btn-wrapper">
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
            
          </CardHeader> */}
          <CardBody className="px-lg-5 py-lg-5">
            <h3
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "2rem",
                marginBottom: "2rem",
              }}
            >
              LOG IN
            </h3>
            <Alert color="warning" isOpen={visible} toggle={onDismiss}>
              {errors}
            </Alert>
            <Form role="form" onSubmit={handleSignIn}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    innerRef={email}
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    innerRef={password}
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                {/* <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label> */}
              </div>
              <div className="text-center">
                <ButtonLoading
                  className="m-1 "
                  type="submit"
                  loading={loading}
                  onClick={handleSignIn}
                  disabled={loading}
                  color="info"
                  block={!loading}
                  outline={false}
                >
                  Sign in
                </ButtonLoading>
                {/* <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button> */}
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;

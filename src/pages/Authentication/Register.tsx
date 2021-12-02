import React, { useEffect } from "react";
import MetaTags from "react-meta-tags";
import { Row, Col, Alert, Container } from "reactstrap";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// action
import { registerUser, apiError } from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

// import images
import logo from "../../assets/images/logo-sm.svg";
import BgImage from 'src/assets/images/bg-3.jpg';

const Register = () => {
  const dispatch = useDispatch();

  const { user, registrationError } = useSelector((state: any) => ({
    user: state.register.user,
    registrationError: state.register.registrationError,
    loading: state.register.loading,
  }));

  // handleValidSubmit
  const handleValidSubmit = (values: any) => {
    dispatch(registerUser(values));
  };

  useEffect(() => {
    dispatch(apiError(""));
  }, [dispatch]);

  return (
    <React.Fragment>
      <MetaTags>
        <title>Register | TraffMe - Dashboard</title>
      </MetaTags>

      <div className="auth-page">
        <Container fluid className="p-0">
            <Col className="reg-center">
              <div className="d-flex ">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="text-center">
                      <Link to="/dashboard" className="d-block auth-logo">
                        <img src={logo} alt="" height="150" />{" "}
                      </Link>
                    </div>
                    <div className="auth-content my-auto">
                      <div className="text-center">
                        <h5 className="mb-0 text-white">Register Account</h5>
                        <p className="text-white mt-2">
                          Get your free TraffMe account now.
                        </p>
                      </div>
                      <AvForm
                        className="needs-validation custom-form mt-2 pt-2"
                        onValidSubmit={(e: any, v: any) => {
                          handleValidSubmit(v);
                        }}
                      >
                        {user && user ? (
                          <Alert color="success">
                            Register User Successfully
                          </Alert>
                        ) : null}

                        {registrationError && registrationError ? (
                          <Alert color="danger">{registrationError}</Alert>
                        ) : null}

                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3 text-white">
                              <AvField id="email" name="email" label="Email" className="form-control" placeholder="Enter email" type="email" required />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="mb-3 text-white">
                              <AvField name="username" label="Username" type="text" required placeholder="Enter username" />
                            </div>
                          </div>
                        </div>

                        <div className="mb-3 text-white">
                          <AvField name="password" label="Password" type="password" required placeholder="Enter Password"
                          />
                        </div>

                        <div className="mb-4">
                          <p className="mb-0 text-white">
                            By registering you agree to the TraffMe{" "}
                            <Link to="#" className="text-orange">
                              Terms of Use
                            </Link>
                          </p>
                        </div>
                        <div className="mb-3">
                          <button
                            className="btn btnOrange w-100 waves-effect waves-light"
                            type="submit"
                          >
                            Register
                          </button>
                        </div>
                      </AvForm>

                      <div className="mt-2 text-center">
                        <p className="text-white mb-0">
                          Already have an account ?{" "}
                          <Link
                            to="/login"
                            className="text-orange fw-semibold"
                          >
                            {" "}
                            Login{" "}
                          </Link>{" "}
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="mb-0">
                        © {new Date().getFullYear()} TraffMe.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            <div
            style={{ backgroundImage: `url(${BgImage})` }}
            className={`authBg pt-md-5 p-4 d-flex`}
            >
              <div className="bgOverlay" />
            </div>

        </Container>
      </div>
    </React.Fragment>
  );
};

export default Register;

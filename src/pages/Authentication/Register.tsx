import React, { useEffect, useState } from "react";
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
import logo from "../../assets/images/logo.svg";

const Register = () => {
  const dispatch = useDispatch();

  const [showPass, useShowPass] = useState<boolean>(false);

  const { user, registrationError, loading } = useSelector((state: any) => ({
    user: state.register.user,
    registrationError: state.register.registrationError,
    loading: state.register.loading,
  }));

  // handleValidSubmit
  const handleValidSubmit = (values: any) => {
    dispatch(registerUser(values));
  };

  const passToggleHandler = () => {
    useShowPass(prev => !prev);
  };

  useEffect(() => {
    dispatch(apiError(""));
  }, [dispatch]);

  return (
    <React.Fragment>
      <MetaTags>
        <title>Register | TraffMe</title>
      </MetaTags>

      <div className="container-fluid">
        <div className="auth-page row">
          <div className="auth-page-form-wrapper col-12 col-lg-6">
            <div className="auth-page-form-body">
              <div className="auth-page-logo text-center">
                <Link to="/dashboard" className="d-block auth-logo">
                  <img src={logo} alt="FoxOffers" width="164" height="42" />
                </Link>
              </div>
              <div className="auth-content">
                <h5 className="auth-page-title">Register account</h5>
                <p className="auth-page-descr">
                  Get your free TraffMe account now
                </p>
                <AvForm
                  className="custom-form"
                  onValidSubmit={(e: any, v: any) => {
                    handleValidSubmit(v);
                  }}
                >
                  <div className="mb-3">
                    <AvField
                      name="email"
                      value=""
                      className="form-control"
                      placeholder="Enter your email"
                      type="email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <AvField
                      name="username"
                      value=""
                      className="form-control"
                      placeholder="Enter your username"
                      type="text"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <div className="auth-page-form-pass">
                      <div
                        className="auth-page-form-pass-toggle"
                        onClick={passToggleHandler}
                      >
                        {showPass ? "HIDE" : "SHOW"}
                      </div>
                      <AvField
                        name="password"
                        value=""
                        type={showPass ? "text" : "password"}
                        className="form-control"
                        required
                        placeholder="Enter your password"
                      />
                    </div>
                    <div className="auth-page-forgot-pass">
                      <Link
                        to="/auth-recoverpw"
                        className=""
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                  <div className="form-checkbox">
                    <input
                      className="form-checkbox-input"
                      type="checkbox"
                      id="remember-check"
                    />
                    <label
                      className="form-checkbox-label"
                      htmlFor="remember-check"
                    >
                      Remember me
                    </label>
                  </div>
                  <div>
                    <button
                      className="auth-page-btn"
                      type="submit"
                      disabled={loading}
                    >
                      {
                        loading ?
                          <i className="bx bx-hourglass bx-spin me-2" /> :
                          "Log In"
                      }
                    </button>
                  </div>
                </AvForm>

                <div className="auth-page-form-descr text-center">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-orange fw-semibold"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="auth-page-img d-none d-lg-block col-lg-6" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;

import React, { useState } from "react";
import MetaTags from "react-meta-tags";

import { Row, Col, Alert, Container } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter, Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// actions
import { loginUser } from "../../store/actions";

// import images
import logo from "../../assets/images/logo.svg";


interface LoginProps {
  history: object;
}

const Login = ({ history }: LoginProps) => {
  const dispatch = useDispatch();

  const [showPass, useShowPass] = useState<boolean>(false);

  const { error, loading } = useSelector((state: any) => ({
    error: state.login.error,
    loading: state.login.loading
  }));

  // handleValidSubmit
  const handleValidSubmit = (event: any, values: any) => {
    if (loading) return;
    dispatch(loginUser(values, history));
  };

  const passToggleHandler = () => {
    useShowPass(prev => !prev);
  };

  return (
    <React.Fragment>
      <MetaTags>
        <title>Login | TraffMe</title>
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
                <h5 className="auth-page-title">Welcome back</h5>
                <p className="auth-page-descr">
                  Sign in to continue to TraffMe.
                </p>
                <AvForm
                  className="custom-form"
                  onValidSubmit={(e: any, v: any) => {
                    handleValidSubmit(e, v);
                  }}
                >
                  {error ? <Alert color="danger">{`Not valid email or password`}</Alert> : null}
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

export default withRouter(Login);
